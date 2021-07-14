const express = require('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
    url = "https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=20d011b069759d05ef1ee53aab315d5c&units=metric"
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(weatherDesc + " " + temp);

            res.write("<p>Hi there!</p>");
            var msg = "<p>Temperature in Moscow is " + temp + " and it is " + weatherDesc + "</p>";
            res.write(msg);
            res.write("<img src="+ imageURL + ">");
            res.send();
        });
    });

    // res.send("Server is up and running!");
});

app.listen(8085, () => {
    console.log("Listening on port 8085.")
});