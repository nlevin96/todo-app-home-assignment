const express = require('express')
const scheduleNotifications = require('./services/notifications')

const logger = require('./logger')

const { PORT } = require('./config')

app = express();

app.listen(PORT, ()=> {
    logger.info(`Notification service is listening on ${PORT}`)
    scheduleNotifications()
})
