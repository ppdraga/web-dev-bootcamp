//jshint esversion: 6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')
const date = require(__dirname + "/date.js")

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var items = ["action 1", "action 2", "action 3"];
var workItems = [];

app.get("/", (req, res) => {

    res.render('list', {listTitle: date.getDate(), newListItems: items});
})

app.post("/", (req, res) => {
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work",
        newListItems: workItems
    });
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.listen(8085, () => {
    console.log("Listening on port 8085.");
});