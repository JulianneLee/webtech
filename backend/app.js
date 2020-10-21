// import the Express and Body-parser package
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

const User = require('./models/user')
const TestKit = require('./models/testKit')
const TestCenter = require('./models/testCenter')
const TestCase = require('./models/testCase')

const app = express()

// mongoose.connect("mongodb+srv://max:XMGMGpGYA7ZP3xVK@cluster0.ozjrv.mongodb.net/node_angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/user', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();

  console.log(post);
  res.status(201).json({
    message:'Post added successfully'
  });
});

module.exports = app;
