const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const users = require('./routes/routes')
var expressValidator = require('express-validator');
var cors = require("cors")


//initialize
const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(expressValidator());

app.use("/", users)

mongoose.Promise = global.Promise;

//database configuration
const db = require('./config/keys').url
mongoose.connect(db, {
    useUnifiedTopology: true ,
    useNewUrlParser: true
}) //this line will return a promise
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log("MongoDB not connected"))

//server started
const PORT = process.env.PORT || 7777

app.listen(PORT, console.log(`server started on port ${PORT}`));

module.exports = app