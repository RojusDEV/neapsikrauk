import csv
import os

import psycopg2

from config import load_config


SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(SCRIPT_DIR, "jobs.csv")


def _to_int(value):
    return int(value) if value not in (None, "") else None


def _required_text(value, fallback):
    if value is None:
        return fallback

    text = str(value).strip()
    return text if text else fallback


def _normalize_job_type(value):
    if value is None:
        return "FULL_TIME"

    normalized = str(value).strip().upper()
    if normalized in {"FULL_TIME", "PART_TIME"}:
        return normalized

    return "FULL_TIME"


def insert_csv_into_db():
    config = load_config()
    insert_query = """
        INSERT INTO jobs (
            title,
            company,
            location,
            category,
            salary_min,
            salary_max,
            description,
            externalurl,
            posteddate,
            expirationdate,
            jobtype,
            status
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT DO NOTHING
    """

    with open(CSV_FILE, "r", newline="", encoding="utf-8") as csv_file:
        reader = csv.DictReader(csv_file)
        rows = []

        for row in reader:
            rows.append(
                (
                    row["title"] or None,
                    _required_text(row["company"], "Unknown"),
                    row["location"] or None,
                    row["category"] or None,
                    _to_int(row["salary_min"]),
                    _to_int(row["salary_max"]),
                    row["description"] or None,
                    row["externalurl"] or None,
                    row["posteddate"] or None,
                    row["expirationdate"] or None,
                    _normalize_job_type(row["jobtype"]),
                    row["status"] or None,
                )
            )

    if not rows:
        return

    with psycopg2.connect(**config) as conn:
        with conn.cursor() as cursor:
            for row in rows:
                cursor.execute(insert_query, row)