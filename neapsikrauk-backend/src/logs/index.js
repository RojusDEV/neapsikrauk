const path = require("path");
const fsPromises = require("fs").promises;
const filePath = path.join(__dirname, "logs.txt");

const createLog = async (error) => {
  try {
    const logEntry = `[${new Date().toISOString()}] ERROR
    Message: ${error.message}
    Stack: ${error.stack}
    --------------------------------
    `;
    await fsPromises.appendFile(filePath, logEntry);
  } catch (err) {
    console.error("Failed to write a log: ", err);
  }
};

module.exports = createLog;
module.exports.createLog = createLog;
