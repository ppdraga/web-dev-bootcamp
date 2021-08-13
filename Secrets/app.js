//jshint esversion:6


const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;


dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// login to mongo shell
// use userDB
// db.createUser({user: 'mongo', pwd: 'mongo', roles: [ { role: 'readWrite', db: 'userDB'} ]});
mongoose.connect("mongodb://mongo:mongo@localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home");
});


app.get("/login", (req, res) => {
    res.render("login");
});


app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const newUser = new User({
            email: req.body.username,
            password: hash,
        });
        newUser.save((err) => {
            if (!err) {
                // res.redirect("/");
                res.render("secrets");
            } else {
                res.send(err);
            }
        });
    });
    
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.compare(password, saltRounds, (err, res) => {

    });
    User.findOne({email: username}, (err, user) => {
        if (!err) {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        res.render("secrets");
                    } else {
                        console.log("password incorrect");
                        res.render("login");
                    }
                });
            } else {
                console.log("no user found");
                res.render("login");
            }
        } else {
            res.send(err);
        }
    });
    
});


app.listen(8085, function() {
    console.log("Server started on port 8085");
});

