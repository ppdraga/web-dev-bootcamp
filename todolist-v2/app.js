//jshint esversion: 6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const _ = require("lodash");
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

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

var items = [];
var workItems = [];

app.get("/", (req, res) => {
    Item.find({}, function(err, items){
        if (!err) {
            res.render("list", {
                listTitle: "Today", 
                newListItems: items
            });
        }
    });
})

app.post("/", (req, res) => {

    const itemName = req.body.newItem;
    const listName = _.capitalize(req.body.list);

    const item = new Item ({
        name: itemName,
    });

    if (listName == "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: _.lowerCase(listName)}, function(err, list){
            if (!err) {
                list.items.push(item);
                list.save();
                res.redirect("/" + listName);
            }
        });
    }
});

app.post("/delete", (req, res) => {
    const itemID = req.body.checkbox;
    const listName = _.capitalize(req.body.listName);
    if (listName == "Today") {
        Item.findByIdAndRemove(itemID, function(err){ 
            res.redirect("/");
        });
    } else {
        List.findOneAndUpdate({name: _.lowerCase(listName)}, {$pull: {items: {_id: itemID}}}, function(err, list){
            if (!err) {
                res.redirect("/" + listName);
            }
        });
    }
    
});

app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: _.lowerCase(customListName)}, function(err, list){
        if (!list) {
            list = new List({
                name: _.lowerCase(customListName),
                items: []
            });
            list.save();
        }
        res.render("list", {
            listTitle: customListName,
            newListItems: list.items
        });
    });
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.listen(8085, () => {
    console.log("Listening on port 8085.");
});