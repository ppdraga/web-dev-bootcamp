//jshint esversion: 6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')


const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var items = ["action 1", "action 2", "action 3"];

app.get("/", (req, res) => {
    var today = new Date();
    var currenDay = today.getDay();
    var day = "";

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);


    res.render('list', {kindOfDay: day, newListItems: items});
})

app.post("/", (req, res) => {
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");

})

app.listen(8085, () => {
    console.log("Listening on port 8085.");
});