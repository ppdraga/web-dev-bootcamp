//jshint esversion: 6

const express = require('express');
const request = require('request')
const https = require('https');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');

dotenv.config();
// console.log(`Your api_key is ${process.env.API_KEY}`);

const apiKey = process.env.API_KEY;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    // res.sendFile(__dirname + "/signup.html");
    console.log(firstName, lastName, email);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/2f65e3ad09";
    const options = {
        method: "POST",
        auth: "ppdraga:" + apiKey
    }
    const request = https.request(url, options, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const data2 = JSON.parse(data);
            console.log(data2);
        });
    });
    request.write(jsonData);
    request.end();

})

app.listen(8085, () => {
    console.log("Listening on port 8085.");
});

// List id
// 2f65e3ad09
