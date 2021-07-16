const mysql = require("mysql2");
const config = require('config');
require('dotenv').config();
const conn = mysql.createConnection({
    host: config.get("dbconfig.host"),
    user: config.get("dbconfig.user"),
    password: config.get("dbconfig.password"),
    database: config.get("dbconfig.database")
});

module.exports = { conn }