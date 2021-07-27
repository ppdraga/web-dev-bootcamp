//jshint esversion: 6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')


const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    var today = new Date();
    var currenDay = today.getDay();
    var day = "";

    // if (today.getDay() === 6 || today.getDay() === 0) {
    //     day = "weekend";
    // } else {
    //     day = "weekday";
    // }
    switch (currenDay){
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tueday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Sunday";
            break;
        case 7:
            day = "Saturday";
            break;
    }
    res.render('list', {kindOfDay: day})
})

app.post("/", (req, res) => {
    

})

app.listen(8085, () => {
    console.log("Listening on port 8085.");
});