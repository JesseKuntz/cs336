const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require("body-parser");

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
    console.log("Server is running on port: "+ port);
});

app.get('/hello', function(req, res) {
    res.send({"content" : req.query.name});
});