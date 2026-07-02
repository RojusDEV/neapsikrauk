require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const baseURL = "/api/v1";
const PORT = process.env.DB_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

const queryLog = require("./src/middlewares/queryLog");
const { jobsRoutes, userRoutes } = require("./src/routes");

app.use(queryLog);

app.use(`${baseURL}/jobs`, jobsRoutes);
app.use(`${baseURL}/users`, userRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
