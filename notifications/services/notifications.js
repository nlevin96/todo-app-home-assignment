const axios = require('axios')
const schedule = require('node-schedule')

const { TODO_DEADLINE_SERVICE_ENDPOINT, DAYS_LEFT } = require('../config')

const logger = require('../logger')

async function sendNotification(todo) {
    logger.info(`sending notification to task ${todo._id}`)
    console.log(`Notification sent for the following task: ${todo.content} | deadline ${todo.deadline}`)
}

async function getTodos() {
    logger.info('getting tasks with close deadline')
    try{
        const response = await axios.get(TODO_DEADLINE_SERVICE_ENDPOINT + '?daysLeft=' + DAYS_LEFT);
        return response.data;
    } catch(err) {
        logger.error(err)
    }
}

function scheduleNotifications() {
    schedule.scheduleJob('*/5 * * * *', async() => {
        const todos = await getTodos()
        logger.info(todos.length === 0 ?'did not get notifications with close deadline' : 'sending notifications')
        for (const todo of todos) {
            await sendNotification(todo);
          }
        console.log('------------------------------------------')
    })
}

module.exports = scheduleNotifications
