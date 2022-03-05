const cors = require('cors');
const bodyParser = require('body-parser');
const { get, request } = require('http');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const { response } = require('express');
const express= require('express');
// Start up an instance of app
const app = express();
const port = 5000

app.get('/all', function(req, res) {
    res.send(projectData)
  });
// Setup Server 
app.listen(port, function() {
    console.log(`Server Running on: http://localhost:${port}!`)
  });
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Post Route
app.post('/postData', function(req, res) {
    projectData = {
        date:req.body.date,
        temp:req.body.temp,
        content:req.body.content
    };
    res.send(projectData)
});