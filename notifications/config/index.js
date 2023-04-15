const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

module.exports = {
    PORT: process.env.PORT,
    TODO_DEADLINE_SERVICE_ENDPOINT: process.env.TODO_DEADLINE_SERVICE_ENDPOINT,
    DAYS_LEFT: process.env.DAYS_LEFT,
    LOG_LEVEL: process.env.LOG_LEVEL
}