const express = require('express')

const app = express();

app.get('/', (req, res) => {
    res.send("Hi there!");
});

app.get('/contact', (req, res) => {
    res.send("Contact page!");
});

app.listen(8085, () => {
    console.log("Listening on port 8085.")
});
