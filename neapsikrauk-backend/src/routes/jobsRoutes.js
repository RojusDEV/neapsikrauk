const express = require("express");
const { pool } = require("../db");
const createLog = require("../logs");

const router = express.Router();

const MAX_PAGE_SIZE = 10;

const allowedFilters = {
  jobType: "jobtype",
  status: "status",
  location: "location",
  salaryMin: "salary",
  salaryMax: "salary",
  company: "company",
};

const getPageNumber = (value) => Math.max(parseInt(value, 10) || 1, 1);

const getPageSize = (value) =>
  Math.min(Math.max(parseInt(value, 10) || MAX_PAGE_SIZE, 1), MAX_PAGE_SIZE);

const addValue = (values, value) => {
  values.push(value);
  return `$${values.length}`;
};

const addSalaryConditions = (query, values, conditions) => {
  const { salaryMin, salaryMax } = query;

  if (salaryMin === undefined && salaryMax === undefined) {
    return;
  }

  const parsedSalaryMin = Number(salaryMin);
  const parsedSalaryMax = Number(salaryMax);
  const hasSalaryMin =
    salaryMin !== undefined &&
    salaryMin !== "" &&
    !Number.isNaN(parsedSalaryMin);
  const hasSalaryMax =
    salaryMax !== undefined &&
    salaryMax !== "" &&
    !Number.isNaN(parsedSalaryMax);

  if (hasSalaryMin && hasSalaryMax) {
    const salaryMinPlaceholder = addValue(values, parsedSalaryMin);
    const salaryMaxPlaceholder = addValue(values, parsedSalaryMax);

    conditions.push(
      `(salary_min >= ${salaryMinPlaceholder} AND salary_max <= ${salaryMaxPlaceholder})`,
    );
    return;
  }

  if (hasSalaryMin) {
    const salaryMinPlaceholder = addValue(values, parsedSalaryMin);
    conditions.push(`salary_max >= ${salaryMinPlaceholder}`);
  }

  if (hasSalaryMax) {
    const salaryMaxPlaceholder = addValue(values, parsedSalaryMax);
    conditions.push(`salary_min <= ${salaryMaxPlaceholder}`);
  }
};

const addStructuredFilters = (query, values, conditions) => {
  for (const [key, value] of Object.entries(query)) {
    if (
      !allowedFilters[key] ||
      key === "salaryMin" ||
      key === "salaryMax" ||
      key === "keyw"
    ) {
      continue;
    }

    if (Array.isArray(value)) {
      const placeholders = value.map((entry) => addValue(values, entry));
      conditions.push(`LOWER(${key}::text) IN (${placeholders.join(",")})`);
      continue;
    }

    const placeholder = addValue(values, value);
    conditions.push(
      `LOWER(${allowedFilters[key]}::text) = LOWER(${placeholder})`,
    );
  }
};

const buildJobsQuery = ({
  conditions,
  keyw,
  limitPlaceholder,
  offsetPlaceholder,
  keywordPlaceholder,
}) => {
  if (!keyw) {
    return `select * from jobs ${conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""} LIMIT ${limitPlaceholder} OFFSET ${offsetPlaceholder}`;
  }

  return `SELECT *,
      ts_rank(
        search_vector,
        websearch_to_tsquery('english', ${keywordPlaceholder}) ||
        websearch_to_tsquery('lithuanian', ${keywordPlaceholder})
      ) AS rank,
      COUNT(*) OVER() AS total_count
    FROM jobs
    WHERE (
      search_vector @@ websearch_to_tsquery('english', ${keywordPlaceholder})
      OR search_vector @@ websearch_to_tsquery('lithuanian', ${keywordPlaceholder})
    )${conditions.length === 0 ? "" : " AND " + conditions.join(" AND ")}
    ORDER BY rank DESC
    LIMIT ${limitPlaceholder}
    OFFSET ${offsetPlaceholder};`;
};

router.get("/", async (req, res) => {
  try {
    const page = getPageNumber(req.query.page);
    const limit = getPageSize(req.query.limit);
    const offset = (page - 1) * limit;

    const conditions = [];
    const values = [];
    const keyw = req.query.keyw ?? "";

    addSalaryConditions(req.query, values, conditions);
    addStructuredFilters(req.query, values, conditions);

    values.push(limit);
    const limitPlaceholder = `$${values.length}`;
    values.push(offset);
    const offsetPlaceholder = `$${values.length}`;
    let keywordPlaceholder = null;

    if (keyw.length > 0) {
      values.push(keyw);
      keywordPlaceholder = `$${values.length}`;
    }

    const query = buildJobsQuery({
      conditions,
      keyw,
      limitPlaceholder,
      offsetPlaceholder,
      keywordPlaceholder,
    });

    const result = await pool.query(query, values);
    return res
      .status(200)
      .json({
        data: result.rows,
        total_count: Number(result.rows[0]?.total_count ?? 0),
      });
  } catch (error) {
    await createLog(error);
    return res.status(500).json({
      error: { message: error.message },
    });
  }
});

router.get("/:jobId", async (req, res) => {
  try {
    const query = `SELECT * FROM jobs WHERE job_id = $1`;
    const result = await pool.query(query, [req.params.jobId]);
    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    await createLog(error);
    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
});

router.post("/", (req, res) => {});

router.patch("/:jobId", (req, res) => {});

router.delete("/:jobId", (req, res) => {});

module.exports = router;
