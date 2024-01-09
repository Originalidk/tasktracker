require('dotenv').config()

module.exports = {
    "tasktrackerdb": {
        "host": process.env.TASKTRACKER_DB_HOST,
        "port": parseInt(process.env.TASKTRACKER_DB_PORT),
        "url": "",
        "database": process.env.TASKTRACKER_DB_DATABASE,
        "password": process.env.TASKTRACKER_DB_PASSWORD,
        "name": process.env.TASKTRACKER_DB_NAME,
        "user": process.env.TASKTRACKER_DB_USER,
        "connector": "postgresql"
    }
}