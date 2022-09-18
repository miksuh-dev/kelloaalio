import { format } from "logform";
import winston from "winston";
import "winston-daily-rotate-file";

const transport = new winston.transports.DailyRotateFile({
  filename: "logs/kelloaalio-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  zippedArchive: true,
});

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.errors({ stack: true }),
    format.metadata(),
    format.timestamp(),
    format.json(),
  ),
  transports: [
    transport,
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.prettyPrint(),
    }),
  );
}

export default logger;
