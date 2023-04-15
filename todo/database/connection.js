const mongoose = require('mongoose')
const { MONGO_URI } = require('../config')

async function connect() {
    try{
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = connect;