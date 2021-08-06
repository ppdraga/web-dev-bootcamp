//jshint esversion: 6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://mongo:mongo@localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});
// login to mongo shell
// use todolistDB
// db.createUser({user: 'mongo', pwd: 'mongo', roles: [ { role: 'readWrite', db: 'todolistDB'} ]});
mongoose.set('useFindAndModify', false);

const itemSchema = {
    name: String
  };
const Item = mongoose.model("Item", itemSchema);

var items = [];
var workItems = [];

app.get("/", (req, res) => {
    Item.find({}, function(err, items){
        res.render("list", {
            listTitle: date.getDate(), 
            newListItems: items
        });
      });
})

app.post("/", (req, res) => {
    const item = new Item ({
        name: req.body.newItem,
    });
    item.save(function(err){
        if (!err) {
            res.redirect("/");
        }
    });

    // if (req.body.list === "Work") {
    //     workItems.push(item);
    //     res.redirect("/work");
    // } else {
    //     items.push(item);
    //     res.redirect("/");
    // }
});

app.post("/delete", (req, res) => {
    let itemID = req.body.checkbox;
    Item.findByIdAndRemove(itemID, function(err){ 
        res.redirect("/");
    });
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