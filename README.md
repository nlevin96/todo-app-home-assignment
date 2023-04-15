# TODOs Web Application

This is a microservices-based web application for managing todos and sending notifications when a todos' deadline is close.
The application is built using Node.js and MongoDB for the backend and Angular for the frontend.

## Table of Contents
[Installation](#installation)  
[Usage](#usage)  
[Endpoints](#endpoints)  
[Request-Body](#request-body)  
[Tests](#tests)  
[Assumptions](#assumptions)  
[Todo-microservice](#todo-microservice)  
[Notification-microservice](#notification-microservice)  
[UI](#ui)  

<a name="installation"/>

## Installation

1. Clone the repository
2. Install Node.js and MongoDB on your system for running the backend
3. Install Angular CLI for running the UI
4. If you want to run with Dockerfile make sure docker is installed on your machine
5. Install dependencies using npm install command in each folder

<a name="usage"/>

## Usage

First, make sure the MONGO_URI is OK

### usage using docker

1. Set the TODO_DEADLINE_SERVICE_ENDPOINT in the notification config to TODO_DEADLINE_SERVICE_ENDPOINT = 'http://todo:8080/api/todo/deadline-upcoming'
2. In the todo folder run: docker build . -t todo-microservice
3. In the notifications folder run: docker build . -t notifications-microservice
4. Create a new network by running: docker network create NETWORK_NAME
5. Start the todo-microservice with the following command: docker run --name todo --network NETWORK_NAME -p 8080:8080 -d todo-microservice
6. Start the notification microservice with the following command: docker run --name notification --network NETWORK_NAME -p 8081:8081 -d notifications-microservice
7. After both of the microservices are running open the UI folder and run: npm install and ng serve -o in order to open the UI and manage the todos

note: you can see the logs in the console by running docker logs IMAGE_NAME -f

### usage without using docker

1. Start the Todo microservice using npm run start command
2. Start the Notification microservice using npm run start command
3. Start the UI by running ng serve -o

<a name="endpoints"/>

## Endpoints
The Todo microservice has the following endpoints:

POST /api/todo - Create a new todo  
GET /api/todo - Get all todos  
PUT /api/todo/:id - Update a todo by ID  
DELETE /api/todo/:id - Delete a todo by ID  
GET /api/todo/deadline-upcoming - Get all the todos with a close deadline (default - in 3 days - can be changed in the configuration)  
GET /api/todo/:id - Get a todo by ID  

<a name="request-body"/>

## Request Body
The request body for creating or updating a todo should be in JSON format, and include the following fields:

content(required) - A content/description of the todo
deadline(optional) - The deadline for the todo in ISO-8601 format (e.g. "2023-05-01T00:00:00.000Z") - if not included the default is 7 days
completed(optional) - Boolean. default value is false

Example request body:

```
{
  "content": "Learn to play guitar",
  "deadline": "2023-05-01T00:00:00.000Z"
}
```
<a name="tests"/>

## Tests

Each microservice contains unit tests. You can run them by using npm test.
For development, you can run the app in dev mode by running npm run start:dev and change the LOG_LEVEL in the config.

<a name="todo-microservice"/>

## Todo-microservice

The TODO microservice implements RESTful API for the todos. It contains the described endpoints above for the end user and for the notifications service.
It's connected to MongoDB and using common modules like express and mongoose.

<a name="notification-microservice"/>

## Notification-microservice

The notification microservice implements logic that sends the user notifications when a todo is close to its deadline and have't completed yet.
It contains a scheduler function that sends a get request every period of time (5 minutes) that returns all the todos that are close to the deadline.
It is possible to query the endpoint with daysLeft parameter that defines what "close" means - the default value is 3 days left - you can change it in the config.

Note: In a real world app the scheduler might be called once a day, but for testing the logic I implemented it with 5 minutes.

<a name="ui"/>

## UI

The UI is a simple UI built with AngularCLI. it allows the user to see the tasks, add new tasks, update them, delete them and mark them when they're completed.

<a name="assumptions"/>

## Assumptions

1. The app only has one user - no auth needed.
2. The function sendNotification() is implemented (right now it prints message to the console)
3. The app is running locally - has only one config for local env (not for ci, dev, prod)
4. Since the UI is a sample UI, edge cases were not treated yet.