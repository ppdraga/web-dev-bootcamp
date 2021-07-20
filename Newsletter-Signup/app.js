//jshint esversion: 6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    // res.sendFile(__dirname + "/signup.html");
    console.log(firstName, lastName, email);
})

app.listen(8085, () => {
    console.log("Listening on port 8085.");
});

