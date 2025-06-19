import winston from "winston";
import { getCorrelationId } from "../utils/helpers/request.helper";
import DailyRotateFile from "winston-daily-rotate-file";
import { MongoDB } from 'winston-mongodb';
import { serverConfig } from ".";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
    winston.format.json(),

    //define a custom print
    winston.format.printf(({ timestamp, level, message, ...data }) => {
      const output = {
        level,
        message,
        timestamp,
        correlationId: getCorrelationId(),
        data,
      };
      return JSON.stringify(output);
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d",
    }),
    new MongoDB({
      db: serverConfig.MONGO_URI,
      collection: "logs",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  ],
});

export default logger;
