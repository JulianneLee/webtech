// import the Express and Body-parser package
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkAuth = require("./middleware/check-auth")

const User = require('./models/User')
const TestCase = require('./models/TestCase')
const TestCenter = require('./models/TestCenter')
const TestKit = require('./models/TestKit')

const app = express()

mongoose.connect("mongodb+srv://admin:admin@cluster0.jyb5k.mongodb.net/cts?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.post('/api/users', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    position: req.body.position,
    centerID: req.body.centerID
  });
  user.save().then(result => {
    res.status(201).json({
      message: 'User created',
      result:result
    })
  }).catch(err => {
    res.status(500).json({
      error:err
    })
  })
});

app.get('/api/users', (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: 'Post fetched successfully',
      users: documents
    });
  })
});

app.post('/api/testCenters', (req, res, next) => {
  const testCenter = new TestCenter({
    name: req.body.name,
    managerID: req.body.managerID
  });
  testCenter.save().then(result => {
    res.status(200).json({
      message: 'Test Center added successfully',
      testCenterId: result._id
    });
  });
});

app.post('/api/user/login',(req,res,next) => {
  let fetchedUser;
  User.findOne({email: req.body.email}).then(user => {
    if (!user){
      return res.status(401).json({
        message: 'Auth failed'
      })
    }
    fetchedUser = user
    return bcrypt.compare(req.body.password, user.password)
  }).then(result => {
    if (!result){
      return res.status(401).json({
        message: 'Auth failed'
      })
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      'secret_key',
      {expiresIn: '1h'}
    )
    res.status(200).json({
      token: token
    })
  }).catch(err => {
    return res.status(401).json({
      message: 'Auth failed'
    })
  })
})

module.exports = app;
