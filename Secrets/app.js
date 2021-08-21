//jshint esversion:6


const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");

// const bcrypt = require("bcrypt");
// const saltRounds = 10;


dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// login to mongo shell
// use userDB
// db.createUser({user: 'mongo', pwd: 'mongo', roles: [ { role: 'readWrite', db: 'userDB'} ]});
mongoose.connect("mongodb://mongo:mongo@localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});


app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {


    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        }
    });

    
    // bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    //     const newUser = new User({
    //         email: req.body.username,
    //         password: hash,
    //     });
    //     newUser.save((err) => {
    //         if (!err) {
    //             // res.redirect("/");
    //             res.render("secrets");
    //         } else {
    //             res.send(err);
    //         }
    //     });
    // });
    
});

app.post("/login", (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    req.login(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        }
    });

    // User.findOne({email: username}, (err, user) => {
    //     if (!err) {
    //         if (user) {
    //             bcrypt.compare(password, user.password, (err, result) => {
    //                 if (result) {
    //                     res.render("secrets");
    //                 } else {
    //                     console.log("password incorrect");
    //                     res.render("login");
    //                 }
    //             });
    //         } else {
    //             console.log("no user found");
    //             res.render("login");
    //         }
    //     } else {
    //         res.send(err);
    //     }
    // });
    
});


app.listen(8085, function() {
    console.log("Server started on port 8085");
});

