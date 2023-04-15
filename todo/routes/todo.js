const express = require('express')
const router = express.Router()
const { Task, validateTask } = require('../database/models/task')
const taskDBService = require('../database/controllers/task-controller')

const logger = require('../logger')

router.get('/', async (req, res) => {
    logger.info('Received GET tasks request to /api/todo');
    try{
        const tasks = await taskDBService.getTasks();
        logger.info(`Sending response to GET request to /api/todo with status code: ${res.statusCode}`);
        res.send(tasks);
    } catch(err) {
        logger.error(`Error: ${err.message}`);
        return res.status(500).send('Server Error!');
    }
});

router.post('/', async (req, res) => {
    logger.info('Received POST task request to /api/todo');
    try {
        const { value, error } = validateTask(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let newTask = new Task({
            content: value.content,
            deadline: value.deadline,
            completed: value.completed
        });

        newTask = await taskDBService.createTask(newTask);
        logger.info(`Sending response to POST request to /api/todo with status code: ${res.statusCode}`);
        res.send(newTask);
    } catch(err) {
        logger.error(`Error: ${err.message}`);
        return res.status(500).send('Server Error!');
    }
});

router.put('/:id', async (req, res) => {
    logger.info(`Received PUT task request to /api/todo for task ${req.params.id}`);
    try {
        const { value, error } = validateTask(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const updatedTask = await taskDBService.updateTask(req.params.id, value);
        if (!updatedTask) return res.status(404).send('Not found');
        logger.info(`Sending response to PUT request to /api/todo for task ${req.params.id} with status code: ${res.statusCode}`);
        res.send(updatedTask)
    } catch(err) {
        logger.error(`Error: ${err.message}`);
        return res.status(500).send(err.details[0].message);
    }
});

router.delete('/:id', async (req, res) => {
    logger.info(`Received DELETE task request to /api/todo for task ${req.params.id}`);
    try {
        const deletedTask = await taskDBService.deleteTask(req.params.id);
        if (!deletedTask) return res.status(404).send('Not found');
        logger.info(`Sending response to DELETE request to /api/todo for task ${req.params.id} with status code: ${res.statusCode}`);
        res.send(deletedTask)
    } catch(err) {
        logger.error(`Error: ${err.message}`);
        return res.status(500).send(error.details[0].message);
    }
});

router.get('/deadline-upcoming', async (req, res) => {
    logger.info('Received GET tasks request to /api/todo/deadline-upcoming');
    try {
        let { daysLeft } = req.query;
        daysLeft = daysLeft === undefined ? 3 : daysLeft;
        logger.info(`days left until deadline ${daysLeft}`)
        const tasks = await taskDBService.getDeadlineTasks(daysLeft);
        logger.info(`Sending response to GET request to /api/todo/deadline-upcoming with status code: ${res.statusCode}`);
        res.send(tasks);
    } catch(err) {
        logger.error(err);
        return res.status(500).send('Server Error!');
    }
});

router.get('/:id', async (req, res) => {
    logger.info(`Received GET task request to /api/todo for task ${req.params.id}`);
    try {
        const task = await taskDBService.getTaskById(req.params.id);
        if (!task) return res.status(404).send('Not found');
        logger.info(`Sending response to GET request to /api/todo for task ${req.params.id} with status code: ${res.statusCode}`);
        res.send(task)
    } catch(err) {
        logger.error(err);
        return res.status(500).send('Server Error!');
    }
});


module.exports = router;