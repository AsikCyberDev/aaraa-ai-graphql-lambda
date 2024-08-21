const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info',  // Capture logs at 'info' level and above
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),  // Logs to console, picked up by CloudWatch in Lambda
        // Additional transports like files can be added here if needed
    ],
});

module.exports = logger;
