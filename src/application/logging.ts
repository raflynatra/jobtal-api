import winston from "winston";
import util from "node:util"; // ✅ Correct way to import in TypeScript (ESM)

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message, timestamp }) => {
      const formattedMessage =
        typeof message === "object"
          ? util.inspect(message, { depth: null, colors: true })
          : message;

      return `[${timestamp}] ${level}: ${formattedMessage}`;
    })
  ),
  transports: [new winston.transports.Console({})],
});
