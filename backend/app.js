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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
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
      id: result._id
    })
  }).catch(err => {
    return res.status(409).json({
      error:err
    })
  })
});

app.get('/api/users', (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: 'Users fetched successfully',
      results: documents
    });
  })
});

app.get('/api/testCenters', (req, res, next) => {
  TestCenter.find().then(documents => {
    res.status(200).json({
      message: 'Test Centers fetched successfully',
      results: documents
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
      id: result._id
    });
  });
});

app.get('/api/testCases', (req, res, next) => {
  TestCase.find().then(documents => {
    res.status(200).json({
      message: 'Test Cases fetched successfully',
      results: documents
    });
  })
});

app.post('/api/testCases', (req, res, next) => {
  const testCase = new TestCase({
    type: req.body.type,
    symptom: req.body.symptom,
    officerID: req.body.officerID,
    testCreated: req.body.testCreated,
    status: req.body.status,
    result: req.body.result,
    resultCreated: req.body.resultCreated
  });
  testCase.save().then(result => {
    res.status(200).json({
      message: 'Test Case created',
      id: result._id
    })
  })
})

app.put('/api/testCases/:id', (req, res, next) => {
  TestCase.updateOne({_id: req.params.id}, req.body).then(result =>{
    console.log(result);
    res.status(200).json({
      message: "Test Case updated!"
    })
  })
})

app.get('/api/testKits', (req, res, next) => {
  TestKit.find().then(documents => {
    res.status(200).json({
      message: 'Test Kits fetched successfully',
      results: documents
    });
  })
});

app.post('/api/testKits', (req, res, next) => {
  const testKit = new TestKit({
    name: req.body.name,
    stock: req.body.stock,
    centerID: req.body.centerID
  });
  testKit.save().then(result => {
    res.status(200).json({
      message: 'Test Kit added successfully',
      id: result._id
    })
  })
})

app.put('/api/testKits/:id', (req, res, next) => {
  TestKit.updateOne({_id: req.params.id}, req.body).then(result =>{
    console.log(result);
    res.status(200).json({
      message: "Test Kit updated!"
    })
  })
})

app.delete("/api/testKits/:id",(req,res,next) => {
  TestKit.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "TestKit deleted!"})
  })
})

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
