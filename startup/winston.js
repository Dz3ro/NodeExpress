const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./errorLogs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./errorLogs/warn.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "./errorLogs/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "./errorLogs/rest.log",
      level: "http",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "./errorLogs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "./errorLogs/rejections.log" }),
  ],
});

process.on("uncaughtExceptions", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

process.on("uncaughtRejection", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

module.exports = logger;
