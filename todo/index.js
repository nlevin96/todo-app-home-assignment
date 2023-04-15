const express = require('express')
const cors = require('cors')
const dbConnection = require('./database/connection')
const todo = require('./routes/todo')

const logger = require('./logger')

const { PORT } = require('./config')


app = express()
app.use(cors());
app.use(express.json())
app.use('/api/todo', todo)

dbConnection()

app.listen(PORT, () => {
    logger.info(`TODO service is listening on port ${PORT}`)
});