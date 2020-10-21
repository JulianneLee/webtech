// import the Express and Body-parser package
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const models = require('./models')

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
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.post('/api/users', (req, res, next) => {
  const user = new models.User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    position: req.body.position,
    centerID: req.body.centerID
  });
  user.save();

  console.log(user);
  res.status(201).json({
    message:'User added successfully'
  });
});

app.get('/api/users', (req, res, next) => {
  models.User.find().then(documents => {
    // console.log(users);
    res.status(200).json({
      message: 'Post fetched successfully',
      users: documents
    });
  })
});



module.exports = app;
