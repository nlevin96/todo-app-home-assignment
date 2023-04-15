const express = require('express')
const router = express.Router()
const { Task, validateTask } = require('../database/models/task')
const taskDBService = require('../database/controllers/task-controller')

router.get('/', async (req, res) => {
    try{
        const tasks = await taskDBService.getTasks();
        res.send(tasks);
    } catch(err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).send('Server Error!');
    }
});

router.post('/', async (req, res) => {
    try {
        const { value, error } = validateTask(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let newTask = new Task({
            content: value.content,
            deadline: value.deadline,
            completed: value.completed
        });

        newTask = await taskDBService.createTask(newTask);
        res.send(newTask);
    } catch(err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).send('Server Error!');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { value, error } = validateTask(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const updatedTask = await taskDBService.updateTask(req.params.id, value);
        if (!updatedTask) return res.status(404).send('Not found');
        res.send(updatedTask)
    } catch(err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).send(err.details[0].message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await taskDBService.deleteTask(req.params.id);
        if (!deletedTask) return res.status(404).send('Not found');
        res.send(deletedTask)
    } catch(err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).send(error.details[0].message);
    }
});

router.get('/deadline-upcoming', async (req, res) => {
    try {
        let { daysLeft } = req.query;
        daysLeft = daysLeft === undefined ? 3 : daysLeft;
        const tasks = await taskDBService.getDeadlineTasks(daysLeft);
        res.send(tasks);
    } catch(err) {
        console.error(err);
        return res.status(500).send('Server Error!');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await taskDBService.getTaskById(req.params.id);
        if (!task) return res.status(404).send('Not found');
        res.send(task)
    } catch(err) {
        console.error(err);
        return res.status(500).send('Server Error!');
    }
});


module.exports = router;