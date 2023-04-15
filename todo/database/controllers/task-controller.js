const mongoose = require('mongoose')
const { Task, validateTask } = require('../models/task')

const logger = require('../../logger')

async function getTasks() {
    logger.debug('getting tasks from DB')
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (err) {
      logger.error(`Error fetching tasks: ${err.message}`);
      throw err;
    }
  }

async function createTask(newTask) {
    logger.debug('adding a new task to DB')
    try {
        res = await newTask.save();
        logger.info(`new task created - id: ${res._id}`)
        return res;
    } catch (err) {
        logger.error(`Error fetching tasks: ${err.message}`);
        throw err;
    }
}

async function updateTask(taskID, newTask) {
    logger.debug(`updating task ${taskID} in DB`)
    try {
        const res = await Task.findByIdAndUpdate(taskID, newTask, {new: true});
        return res;
    } catch (err) {
        logger.error(`Error fetching tasks: ${err.message}`);
        throw err;
    }
}

async function deleteTask(taskID) {
    logger.debug(`deleting task ${taskID} from DB`)
    try {
        const res = await Task.findByIdAndRemove(taskID);
        return res;
    } catch (err) {
        logger.error(`Error fetching tasks: ${err.message}`);
        throw err;
    }
}

async function getDeadlineTasks(daysLeft) {
    logger.debug('getting tasks with close deadline from DB')
    try {
        const currentDate = new Date();
        const DaysFromNow = new Date(currentDate.getTime() + (daysLeft * 24 * 60 * 60 * 1000));
        const res = await Task.find({deadline: { $lte: DaysFromNow }, completed: false});
        return res;
    } catch (err) {
        logger.error(`Error fetching tasks: ${err.message}`);
        throw err;
    }
}

async function getTaskById(taskID) {
    logger.debug(`getting task ${taskID} from DB`)
    try {
        const res = await Task.findById(taskID);
        return res;
    } catch(err) {
        logger.error(`Error fetching tasks: ${err.message}`);
        throw err;
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getDeadlineTasks,
    getTaskById
};