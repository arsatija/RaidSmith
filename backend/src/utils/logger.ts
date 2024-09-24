import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, json, colorize, errors } = format;

// Create Winston logger instance
const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), colorize(), errors({ stack: true }), json()),
    transports: [
        // Console transport
        new transports.Console(),
        // File transport for logging errors
        new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
        // File transport for logging all levels
        new transports.File({ filename: path.join(__dirname, '../logs/combined.log') }),
    ],
});

export default logger;
