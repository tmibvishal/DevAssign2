const utilities = require('./utilities.js');
const express = require('express');
const app = express();
const port = process.env.port || 4000;
const bodyParser = require('body-parser');

//for parsing application/json
app.use(bodyParser.json());
//for getting url type data, like the one that is sent by forms
app.use(bodyParser.urlencoded({extended : false}));

app.use('/', express.static("public"));
app.listen(port , function(){
    console.log("Listening at port " + port);
});