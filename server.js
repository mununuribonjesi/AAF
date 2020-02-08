"use strict";

var express = require('express');
var app = express();
var path = require('path');
const mongoose = require('mongoose');
const api = require('./routes/api');
var express = require('express');
var passport = require('passport');

require('./routes/config/passport-config');
require('dotenv').config();

mongoose.connect(
    "mongodb://localhost:27017/TMS",
    {useNewUrlParser: true}
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("sucessfully connected to MongoDb");
});



app.use(passport.initialize());

app.use(passport.session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized:false
}));

app.use(express.static(path.join(__dirname,'/ClientApp/dist/client')));
app.use(express.json());
app.use('/api',api);

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'/ClientApp/dist/client/index.html'));
});

const port = process.env.Port || 3000;

app.listen(port);
