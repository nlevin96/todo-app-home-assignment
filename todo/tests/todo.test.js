const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/todo');

// Mock the taskDBService module to return test data
jest.mock('../database/controllers/task-controller', () => {
  return {
    getTasks: jest.fn(() => [
      { _id: 'task1', content: 'Task 1', deadline: new Date('2023-05-01'), completed: false },
      { _id: 'task2', content: 'Task 2', deadline: new Date('2023-05-02'), completed: true },
      { _id: 'task3', content: 'Task 3', deadline: new Date('2023-05-03'), completed: false }
    ]),
    createTask: jest.fn((task) => ({_id: 'newTask', content: task.content, deadline: task.deadline, completed: task.completed })),
    updateTask: jest.fn((id, task) => ({ _id: id, content: task.content, deadline: task.deadline, completed: task.completed })),
    deleteTask: jest.fn((id) => ({ _id: id, content: 'Task to be deleted', deadline: new Date('2023-05-01'), completed: false })),
    getDeadlineTasks: jest.fn(() => [
      { _id: 'task1', content: 'Task 1', deadline: new Date('2023-05-01'), completed: false },
      { _id: 'task2', content: 'Task 2', deadline: new Date('2023-05-02'), completed: true }
    ]),
    getTaskById: jest.fn((id) => ({ _id: id, content: 'Task ' + id, deadline: new Date('2023-05-01'), completed: false }))
  };
});

// Mount the router on the app
app.use(express.json())
app.use('/api/todo', router);

describe('GET /', () => {
  it('should return todo list', async () => {
    const res = await request(app).get('/api/todo');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(3);
  });
});

describe('POST /', () => {
  it('should create a new task and return it with its id', async () => {
    const newTask = { content: 'New Task', deadline: new Date('2023-05-01'), completed: false };
    let res = await request(app).post('/api/todo').send(newTask);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({_id: 'newTask', content: 'New Task', deadline: "2023-05-01T00:00:00.000Z", completed: false });

    const badRequestTask = { content: '' }
    res = await request(app).post('/api/todo').send(badRequestTask);
    expect(res.statusCode).toEqual(400);
  });
});

describe('PUT /:id', () => {
  it('should update an existing task and return it', async () => {
    const updatedTask = { content: 'Updated Task', deadline: '2023-05-06', completed: true };
    let res = await request(app).put('/api/todo/task1').send(updatedTask);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({ _id: 'task1', content: 'Updated Task', deadline: "2023-05-06T00:00:00.000Z", completed: true  });

    const badRequestUpdate = { content: 'a' }
    res = await request(app).put('/api/todo/task1').send(badRequestUpdate);
    expect(res.statusCode).toEqual(400);
  });
});

describe('DELETE /:id', () => {
  it('should delete an existing task and return it', async () => {
    const res = await request(app).delete('/api/todo/task1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({ _id: 'task1', content: 'Task to be deleted', deadline: "2023-05-01T00:00:00.000Z", completed: false });
  });
});

describe('GET /deadline-upcoming', () => {
    it('should return all tasks with upcoming deadlines', async () => {
        const res = await request(app).get('/api/todo/deadline-upcoming');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2)
    });
});


