require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const baseURL = "/api/v1";

const PORT = process.env.PORT || process.env.DB_PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const allowedOrigins = [
  "http://localhost:5173",
  "https://vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

const queryLog = require("./src/middlewares/queryLog");
const { jobsRoutes, userRoutes } = require("./src/routes");

app.use(queryLog);

app.use(`${baseURL}/jobs`, jobsRoutes);
app.use(`${baseURL}/users`, userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
