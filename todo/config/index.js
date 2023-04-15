const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
}