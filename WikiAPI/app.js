//jshint esversion: 6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const ejs = require("ejs");


const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://mongo:mongo@localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});
// login to mongo shell
// use wikiDB
// db.createUser({user: 'mongo', pwd: 'mongo', roles: [ { role: 'readWrite', db: 'wikiDB'} ]});
// db.articles.insertOne({"title" : "API", "content" : "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."});
// db.articles.insertOne({"title" : "Bootstrap", "content" : "This is a framework developed by Twitter that contains pre-made front-end templates for web design"});
// db.articles.insertOne({"title" : "DOM", "content" : "The Document Object Model is like an API for interacting with our HTML"});

mongoose.set('useFindAndModify', false);

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
    Article.find({}, function(err, articles){
        if (!err) {
            res.send(articles);
        } else {
            res.send(err);
        }
    });
});

// curl -i -X POST -d title="entry title" -d content="entry content" http://127.0.0.1:8085/articles
app.post("/articles", (req, res) => {

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save((err) => {
        if (!err) {
            res.send(newArticle);
        } else {
            res.send(err);
        }
    });

});


app.listen(8085, () => {
    console.log("Listening on port 8085.");
});
