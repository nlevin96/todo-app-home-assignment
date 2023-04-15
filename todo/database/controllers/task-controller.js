const mongoose = require('mongoose')
const { Task, validateTask } = require('../models/task')

// const tasks = await Task.find();

async function getTasks() {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (err) {
      console.error(`Error fetching tasks: ${err.message}`);
      throw err;
    }
  }

async function createTask(newTask) {
    try {
        res = await newTask.save();
        return res;
    } catch (err) {
        console.error(`Error fetching tasks: ${err.message}`);
        throw err;
    }
}

async function updateTask(taskID, newTask) {
    try {
        const res = await Task.findByIdAndUpdate(taskID, newTask, {new: true});
        return res;
    } catch (err) {
        console.error(`Error fetching tasks: ${err.message}`);
        throw err;
    }
}

async function deleteTask(taskID) {
    try {
        const res = await Task.findByIdAndRemove(taskID);
        return res;
    } catch (err) {
        console.error(`Error fetching tasks: ${err.message}`);
        throw err;
    }
}

async function getDeadlineTasks(daysLeft) {
    try {
        const currentDate = new Date();
        const DaysFromNow = new Date(currentDate.getTime() + (daysLeft * 24 * 60 * 60 * 1000));
        const res = await Task.find({deadline: { $lte: DaysFromNow }, completed: false});
        return res;
    } catch (err) {
        console.error(`Error fetching tasks: ${err.message}`);
        throw err;
    }
}

async function getTaskById(taskID) {
    try {
        const res = await Task.findById(taskID);
        return res;
    } catch(err) {
        console.error(`Error fetching tasks: ${err.message}`);
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