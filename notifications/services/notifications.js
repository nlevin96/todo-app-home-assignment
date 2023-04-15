const axios = require('axios')
const schedule = require('node-schedule')

const { TODO_DEADLINE_SERVICE_ENDPOINT, DAYS_LEFT } = require('../config')

async function sendNotification(todo) {
    console.log(`Notification sent for the following task: ${todo.content} | deadline ${todo.deadline}`)
}

async function getTodos() {
    const response = await axios.get(TODO_DEADLINE_SERVICE_ENDPOINT + '?daysLeft=' + DAYS_LEFT);
    return response.data;
}

function scheduleNotifications() {
    schedule.scheduleJob('*/5 * * * *', async() => {
        const todos = await getTodos()
        for (const todo of todos) {
            await sendNotification(todo);
          }
        console.log('------------------------------------------')
    })
}

module.exports = scheduleNotifications
