/*
Answers in lab06.txt
*/

const express = require('express');
const port = 3000;
const app = express();
const HttpStatus = require('http-status-codes');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.listen(port, function () {
    console.log("Server is running on port " + port);
});

app.get('/request', function (req, res) {
    res.status(HttpStatus.OK);
    res.send('Hello World! Normally there would be an amazing webpage here, but for our purposes, this is all you get.');
});

app.head('/request', function (req, res) {
    res.status(HttpStatus.OK);
    res.send('This is lab06. HEAD returns information about the document, not the document itself.');
});

app.post('/request', function (req, res) {
    res.status(HttpStatus.OK);
    console.log("This is a POST.")
    res.send(req.body);
});

app.put('/request', function (req, res) {
    res.status(HttpStatus.OK);
    console.log("This is a PUT.")
    res.send(req.body);
});

app.delete('/request', function (req, res) {
    res.status(HttpStatus.OK);
    res.send('Got a DELETE request at /request. Deleted whatever you wanted to delete.');
});

app.post('/form', function (req, res) {
    res.status(HttpStatus.OK);
    console.log("Look at the data on the site.");
    res.send("Look at this data: Username: " + req.body.user_name + " User Email: " + req.body.user_mail + " Message: " + req.body.user_message);
});

app.all('*', function (req, res) {
    res.status(HttpStatus.NOT_FOUND);
    res.send('404 for url: ' + req.url);
});