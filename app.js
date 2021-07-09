const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const config = require('config');
const { router } = require("./api/router");
app.use(express.json());
const path = require("path");
app.use('/', router);

app.get('/', (req, res) => {
    res.status(200).send("Hello");
});

app.listen(process.env.PORT || config.get("ports.port"), () => console.log("Server is listening at port ", process.env.PORT || config.get('ports.port')));