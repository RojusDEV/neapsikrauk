import requests
from bs4 import BeautifulSoup
import csv
import os
from dotenv import load_dotenv
import re

load_dotenv()
BASE_URL = 'https://www.cvbankas.lt/buhalteris-e-vilniuje/1-13235437'

# ── CSV setup ──────────────────────────────────────────────
CSV_FILE = "jobs.csv"
CSV_HEADERS = [
    "title", "company", "location",
    "salary_min", "salary_max",
    "job_description", "requirements", "offer", "salary_detail", "url"
]

with open(CSV_FILE, "w", newline="", encoding="utf-8") as f:
    csv.writer(f).writerow(CSV_HEADERS)


# ── Helpers ────────────────────────────────────────────────
def parse_salary(salary_text):
    if not salary_text or salary_text == "N/A":
        return None, None
    numbers = re.findall(r'\d+', salary_text)
    if len(numbers) >= 2:
        return int(numbers[0]), int(numbers[1])
    elif len(numbers) == 1:
        return int(numbers[0]), None
    return None, None


def write_row(data):
    with open(CSV_FILE, "a", newline="", encoding="utf-8") as f:
        csv.writer(f).writerow([
            data["title"],
            data["company"],
            data["location"],
            data["salary_min"],
            data["salary_max"],
            data["job_description"],
            data["requirements"],
            data["offer"],
            data["salary_detail"],
            data["url"],
        ])


def get_job_urls(page):
    site_url = f"{BASE_URL}?page={page}"

    try:
        response = requests.get(site_url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"  [!] Nepavyko gauti puslapio {page}: {e}")
        return []

    soup = BeautifulSoup(response.content, "html.parser")
    job_list = soup.find(id="js_id_id_job_ad_list")

    if not job_list:
        return []

    urls = []
    for card in job_list.find_all("article", class_="list_article"):
        link = card.find("a")
        if not link or "href" not in link.attrs:
            continue
        url = link["href"]
        if not url.startswith("http"):
            url = BASE_URL + url
        urls.append(url)

    return urls

def scrape_job(url):
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"  [!] Nepavyko atidaryti {url}: {e}")
        return

    soup = BeautifulSoup(response.content, "html.parser")

    title   = soup.find("h1", itemprop="title")
    company = soup.find("h2", id="jobad_company_title")
    location = soup.find("span", itemprop="addressLocality")
    salary  = soup.find("span", class_="data_tag_component_salary_amount")

    title_text   = title.text.strip()    if title    else "N/A"
    company_text = company.text.strip()  if company  else "N/A"
    location_text = location.text.strip() if location else "N/A"
    salary_text  = salary.text.strip()   if salary   else "N/A"

    salary_min, salary_max = parse_salary(salary_text)

    result = {
        "job_description": "N/A",
        "requirements":    "N/A",
        "offer":           "N/A",
        "salary_detail":   "N/A",
    }

    description_section = soup.find("section", itemprop="description")
    
    if description_section:
        for section in description_section.find_all("section"):
            heading = section.find("h2", class_="jobad_subheading")
            if not heading:
                continue

            heading_text = heading.text.strip()
            txt_div = section.find("div", class_="jobad_txt")
            if not txt_div:
                continue

            items = txt_div.find_all("li")
            content = " | ".join(li.text.strip() for li in items) if items else txt_div.text.strip()

            if "pobūdis" in heading_text:
                result["job_description"] = content
            elif "Reikalavimai" in heading_text:
                result["requirements"] = content
            elif "siūlome" in heading_text:
                result["offer"] = content
            elif "Atlyginimas" in heading_text:
                result["salary_detail"] = content

    write_row({
        "title":           title_text,
        "company":         company_text,
        "location":        location_text,
        "salary_min":      salary_min,
        "salary_max":      salary_max,
        "job_description": result["job_description"],
        "requirements":    result["requirements"],
        "offer":           result["offer"],
        "salary_detail":   result["salary_detail"],
        "url":             url,
    })


page = 1
MAX_PAGES = 10


scrape_job("https://www.cvbankas.lt/buhalteris-e-vilniuje/1-13235437")


# while page <= MAX_PAGES:
#     print(f"\nScraping puslapis {page}...")

#     urls = get_job_urls(page)

#     if not urls:
#         print("Daugiau puslapių nėra.")
#         break

#     for url in urls:
#         print(f"  -> {url}")
#         scrape_job(url)

#     page += 1

print("\nBaigta!")