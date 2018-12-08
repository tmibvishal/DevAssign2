const utilities = require('./utilities.js');
const express = require('express');
const app = express();
const port = process.env.port || 4000;
const bodyParser = require('body-parser');

//pusher api for live commenting
let Pusher = require('pusher');
let pusher = new Pusher({
    appId: "667914",
    key: "1db8e21c1c79816cfa95",
    secret: "91ab424adb61a09fa0b8",
    cluster: "ap2",
    encrypt: true
});


//for parsing application/json
app.use(bodyParser.json());
//for getting url type data, like the one that is sent by forms
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', express.static("public"));

app.post('/comment', function (req, res) {
    console.log(req.body);
    let commentObject = {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    };
    pusher.trigger('PersonalPage_Home', 'new_comment', commentObject);
    res.json({ commentAdded : true });
});

//error handler for 404 page
app.use(function (req, res) {
    res.type("text").send("Page Not Found");
});

app.listen(port, function () {
    console.log("Listening at port " + port);
});