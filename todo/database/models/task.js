const mongoose = require('mongoose')
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    deadline: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 7)
    },
    completed: {
        type: Boolean
    }
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
    schema = Joi.object({
        content: Joi.string().min(5).max(500).required(),
        deadline: Joi.date().default(new Date().setDate(new Date().getDate() + 7)),
        completed: Joi.boolean().default(false)
    });

    return schema.validate(task);
}

exports.Task = Task;
exports.validateTask = validateTask;