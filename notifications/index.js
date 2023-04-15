const express = require('express')
const scheduleNotifications = require('./services/notifications')

const { PORT } = require('./config')

app = express();

app.listen(PORT, ()=> {
    console.log(`Notification service is listening on ${PORT}`)
    scheduleNotifications()
})
