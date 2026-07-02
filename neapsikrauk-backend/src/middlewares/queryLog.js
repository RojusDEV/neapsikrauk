const path = require("path");
const fsPromises = require("fs").promises;

const filePathQuery = path.join(__dirname, "..", "logs", "queryLog.txt");

const queryLog = async (req, res, next) => {
  try {
    const hasQuery = Object.keys(req.query || {}).length > 0;
    const logEntry = `[${new Date().toISOString()}] QUERY\nMethod: ${req.method}\nPath: ${req.originalUrl}\nHasQuery: ${hasQuery}\nQuery: ${JSON.stringify(req.query || {})}\n--------------------------------\n`;
    await fsPromises.appendFile(filePathQuery, logEntry);
    next();
  } catch (err) {
    console.error("Failed to write a query log: ", err);
    next();
  }
};

module.exports = queryLog;
