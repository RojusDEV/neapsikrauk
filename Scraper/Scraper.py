import requests
from bs4 import BeautifulSoup
import csv
import os
import re
from datetime import date, datetime
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse, urljoin

from insert import insert_csv_into_db

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(SCRIPT_DIR, "jobs.csv")

CSV_HEADERS = [
    "title", "company", "location",
    "salary_min", "salary_max",
    "description", "externalurl", "posteddate", "expirationdate", "category", "jobtype", "status"
]

if not os.path.exists(CSV_FILE) or os.path.getsize(CSV_FILE) == 0:
    with open(CSV_FILE, "w", newline="", encoding="utf-8") as f:
        csv.writer(f).writerow(CSV_HEADERS)


def parse_salary(salary_text):
    if not salary_text or salary_text == "N/A":
        return None, None
    numbers = re.findall(r'\d+', salary_text)
    if len(numbers) >= 2:
        return int(numbers[0]), int(numbers[1])
    elif len(numbers) == 1:
        return int(numbers[0]), None
    return None, None


def normalize_salary_bounds(salary_min, salary_max):
    if salary_min is not None and salary_max is None:
        return salary_min, salary_min
    if salary_min is None and salary_max is not None:
        return salary_max, salary_max
    return salary_min, salary_max


def write_row(data):
    with open(CSV_FILE, "a", newline="", encoding="utf-8") as f:
        csv.writer(f).writerow([
            data["title"],
            data["company"],
            data["location"],
            data["salary_min"],
            data["salary_max"],
            data["description"],
            data["externalurl"],
            data["posteddate"],
            data["expirationdate"],
            data["category"],
            data["jobtype"],
            data["status"],
        ])


def get_job_status(expiration_date):
    if not expiration_date:
        return "ACTIVE"

    try:
        expiration = datetime.strptime(expiration_date, "%Y-%m-%d").date()
    except ValueError:
        return "ACTIVE"

    return "EXPIRED" if expiration < date.today() else "ACTIVE"


def get_job_type(soup):
    job_type_label = soup.find("div", class_="label_component_body")
    if not job_type_label:
        return "FULL_TIME"

    job_type_text = job_type_label.get_text(separator=" ", strip=True).lower()

    if "part-time" in job_type_text:
        return "PART_TIME"

    if "visa darbo diena" in job_type_text or "full-time" in job_type_text:
        return "FULL_TIME"

    return "FULL_TIME"


def build_page_url(base_url, page):
    parsed = urlparse(base_url)
    query_params = dict(parse_qsl(parsed.query, keep_blank_values=True))
    query_params["page"] = str(page)
    new_query = urlencode(query_params, doseq=True)
    return urlunparse((parsed.scheme, parsed.netloc, parsed.path, parsed.params, new_query, parsed.fragment))


def get_job_urls(base_url, page):
    site_url = build_page_url(base_url, page)

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
            url = urljoin(base_url, url)
        urls.append(url)

    return urls


def scrape_job(url, category):
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"  [!] Nepavyko atidaryti {url}: {e}")
        return

    soup = BeautifulSoup(response.content, "html.parser")

    title    = soup.find("h1", itemprop="title")
    company  = soup.find("h2", id="jobad_company_title")
    location = soup.find("span", itemprop="addressLocality")
    salary   = soup.find("span", class_="data_tag_component_salary_amount")

    title_text    = title.text.strip()    if title    else None
    company_text  = company.text.strip()  if company  else "Unknown"
    location_text = location.text.strip() if location else None
    salary_text   = salary.text.strip()   if salary   else None

    salary_min, salary_max = parse_salary(salary_text)
    salary_min, salary_max = normalize_salary_bounds(salary_min, salary_max)

    description_text = None
    description_section = soup.find("section", itemprop="description")
    if description_section:
        description_text = description_section.get_text(separator="\n", strip=True)

    upload_date    = None
    expiration_date = None
    status = "ACTIVE"
    job_type = None
    time_tag = soup.find("time", id="jobad_expiration")
    if time_tag:
        expiration_date = time_tag.get("datetime", "")[:10]
        title_attr = time_tag.get("title", "")
        match = re.search(r'(\d{4}-\d{2}-\d{2})', title_attr)
        upload_date = match.group(1) if match else None
        status = get_job_status(expiration_date)

    job_type = get_job_type(soup)

    write_row({
        "title":          title_text,
        "company":        company_text,
        "description":    description_text,
        "location":       location_text,
        "salary_min":     salary_min,
        "salary_max":     salary_max,
        "externalurl":    url, 
        "posteddate":     upload_date,
        "expirationdate": expiration_date,
        "category":       category,
        "jobtype":        job_type,
        "status":         status,
    })


def scrape_from_category(url, category, max_pages=None):
    page = 1

    while page < 2:
        if max_pages is not None and page > max_pages:
            break

        print(f"\n[{category}] Scraping puslapis {page}...")
        urls = get_job_urls(url, page)

        if not urls:
            print(f"[{category}] Daugiau puslapiu nera.")
            break

        for job_url in urls:
            print(f"  -> {job_url}")
            scrape_job(job_url, category)

        page += 1

def init():
    categories = [
        ("IT / Technology", "https://www.cvbankas.lt/?keyw=&padalinys%5B%5D=76&min_salary="),
        ("Marketing / Reklama", "https://www.cvbankas.lt/?keyw=&padalinys%5B%5D=205&min_salary="),
        ("Paslaugos", "https://www.cvbankas.lt/?keyw=&padalinys%5B%5D=489&min_salary="),
        ("Finansai / Bankai", "https://www.cvbankas.lt/?keyw=&padalinys%5B%5D=390&min_salary="),
        ("Logistika / Transportas", "https://www.cvbankas.lt/?keyw=&padalinys%5B%5D=1049&min_salary="),
    ]

    # for category_name, category_url in categories:
    #     scrape_from_category(category_url, category_name)

    insert_csv_into_db()

    print("\nBaigta!")
    
    
    
init()