const mongoose = require('mongoose')
const { MONGO_URI } = require('../config')

const logger = require('../logger')

async function connect() {
    try{
        await mongoose.connect(MONGO_URI);
        logger.info('Connected to MongoDB');
    }
    catch(err) {
        logger.error(err);
    }
}

module.exports = connect;