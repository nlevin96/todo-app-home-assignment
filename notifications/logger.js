const { createLogger, transports, transport } = require('winston')
const { LOG_LEVEL } = require('./config')


const logger = createLogger({
    level: LOG_LEVEL,
    transports: [
        new transports.Console()
    ]
});

module.exports = logger;