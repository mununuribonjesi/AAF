"use strict";

const express = require('express');
const User = require('../models/user');
var bodyParser = require('body-parser');
const router = express.Router();
var passport = require('passport');
require('dotenv').config();
const jwt = require('jsonwebtoken')

//These are the aplications end points


//user api
router.post('/user', async (req, res) => {
  const { username, password } = req.body;
  var user = {};
  user.username = username;
  user.password = password;
  var userModel = new User(user);
  await userModel.save();
  res.json(userModel);
});


//registering api
router.post('/register', function (req, res, next) {
  addToDB(req, res);
});

// add user to database
async function addToDB(req, res) {
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    var doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

//Login Api 
router.post('/login',function(req,res,next){

  passport.authenticate('local',{session: false}, (err, user, info) => {
    if (err) { return res.status(501).json(err); }

    if (!user) { return res.status(501).json(info); }

    req.logIn(user,{session: false}, (err) => {
      if (err) 
      { return res.status(501).json(err); }
     
      const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json({user,token});
      
    });

  })(req, res, next);
});
router.get('/username',verifyToken,function(req,res,next){
jwt.verify(req.token,process.env.ACCESS_TOKEN_SECRET, (err, authData ) => {

  if(err){
    res.sendStatus(403);
  }

    return res.json(
      {authData, message: 'Post created... bitch we got the token',});  
});
});



function verifyToken(req,res,next){

  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    debugger;
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}



module.exports = router;