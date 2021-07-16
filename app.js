const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const config = require('config');
const { router } = require("./api/router");

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,access-token,session_token,user-type,user_type,institute-id,institute_id');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(express.json());
// const path = require("path");
app.use('/', router);

app.get('/', (req, res) => {
    res.status(200).send("Hello");
});
//echo \"Error: no test specified\" && exit 1
app.listen(config.get("ports.port"), () => console.log("Server is listening at port ", config.get('ports.port')));