const { createLogger, transports, transport } = require('winston')

const logger = createLogger({
    level: 'debug',
    transports: [
        new transports.Console()
    ]
});

module.exports = logger;