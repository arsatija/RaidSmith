import winston from 'winston';
import path from 'path';
import chalk from 'chalk';
import util from 'util';
import TripleBeam from 'triple-beam';

const defaultStrip = [TripleBeam.LEVEL, TripleBeam.MESSAGE, TripleBeam.SPLAT];

const myFormat = winston.format.printf(({ level, message, timestamp, ms, error, ...meta }) => {
    const levelColors: Record<string, (text: string) => string> = {
        silly: chalk.magenta.bold,
        debug: chalk.blue,
        verbose: chalk.cyan,
        info: chalk.green,
        warn: chalk.yellow,
        error: chalk.red.bold,
    };

    // Colorize the log level using chalk
    const coloredLevel = levelColors[level] ? levelColors[level](`${chalk.bold(level.toUpperCase())}`) : level;

    const coloredMessage = levelColors[level] ? levelColors[level](message) : level;

    // Format the timestamp, level, and message
    let log = `${chalk.gray(timestamp)} ${coloredLevel} - ${coloredMessage} ${chalk.grey.italic(ms)}`;

    // If there's a stack trace, add it
    if (error) {
        log += `\n${chalk.red(error.stack)}`;
    }

    // Format and colorize metadata (such as objects)
    const stripped = { ...meta };
    defaultStrip.forEach((e) => delete stripped[e]);
    if (Object.keys(stripped).length) {
        log += `\n${util.inspect(stripped, {
            colors: true,
            depth: null,
            showHidden: false,
        })}`;
    }

    return log;
});

// Create Winston logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.ms(),
        winston.format.errors({ stack: true })
    ),
    transports: [
        // Console transport
        new winston.transports.Console({
            format: winston.format.combine(myFormat),
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/combined.log'),
            format: winston.format.combine(winston.format.json()),
        }),
        new winston.transports.File({
            level: 'error',
            filename: path.join(__dirname, '../../logs/error.log'),
            format: winston.format.combine(winston.format.json()),
        }),
    ],
});

export default logger;
