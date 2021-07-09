const mysql = require("mysql2");
const config = require('config');
require('dotenv').config();
const conn = mysql.createConnection({
    host: process.env.DB_HOST || config.get("dbconfig.host"),
    user: process.env.DB_USER || config.get("dbconfig.user"),
    password: process.env.DB_PASSWORD || config.get("dbconfig.password"),
    database: process.env.DB_DATABASE || config.get("dbconfig.database")
});

module.exports = { conn }