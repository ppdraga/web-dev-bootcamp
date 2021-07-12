const express = require('express')

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8085, () => {
    console.log("Listening on port 8085.")
});