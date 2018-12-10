const utilities = require('./utilities.js');
const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

const bodyParser = require('body-parser');
//yo nothing
const http = require('http');
const socketServer = http.Server(app);
const Socket = require('socket.io');
const io = Socket(socketServer);

const commentDb = require("./commentDatabase.js");

//for parsing application/json
app.use(bodyParser.json());
//for getting url type data, like the one that is sent by forms
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', express.static("public"));

app.post('/comment', function (req, res) {
    console.log(req.body);
    res.json({ commentAdded : true });
});


//error handler for 404 page
app.use(function (req, res) {
    res.type("text").send("Page Not Found");
});


//Socket Connection
io.on('connection', function(socket){
    console.log('a user connected');

    socket.emit("initialization", commentDb.get());

    socket.on('disconnect', function () {
        console.log("user disconnected");
    });
    socket.on('comment', function (commentObject) {
        commentDb.add(commentObject);
        //sending the comment received to the rest of the users
        socket.broadcast.emit("comment", commentObject);
        socket.emit("comment", commentObject);
    })
});


socketServer.listen(port, function() {
    console.log("Listening at port " + port);
});