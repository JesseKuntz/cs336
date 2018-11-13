// Author: Jesse Kuntz
// Homework 3

const express = require('express');
const app = express();
const port = 3000;
var path = require('path');
var bodyParser = require('body-parser');
var db;
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/', express.static(path.join(__dirname, 'public')));

// Instructions on how to get or add people.
//
// /people -- a list of all people objects, and can add new people
// /person/id -- the full record for the person with the given ID that you can edit using CURL
// /person/id/name -- the full name (i.e., first & last concatenated into one string) for the person with the given ID
// /person/id/years -- the seniority (i.e., number of years with the organization) of the person with the given ID


app.get('/people', (req, res) => {
    db.collection('people').find().toArray(function (err, result) {
        assert.equal(null, err);

        res.json(result);
    });
});

// Write to the people.json file with the new person.
app.post('/people', (req, res) => {
    db.collection('people').insertOne(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            loginID: req.body.loginID,
            startDate: req.body.startDate
        },
        function(err, r) {
          assert.equal(null, err);
        }
    );
});

app.get('/person/:id', (req, res) => {
    db.collection('people').find().toArray(function (err, result) {
        assert.equal(null, err);

        for (const person of result) {
            if (person["loginID"] == req.params.id) {
                res.json(person);
                return;
            }
        }
    });
});

// Command to test the updating of a person, or PUT.
// curl -X PUT -H "Content-Type: application/json" -d '{"firstName":"Joe","lastName":"Rogers","loginID":"123","startDate":"1996-08-22"}' http://localhost:3000/person/123
app.put('/person/:id', (req, res) => {
    db.collection('people').updateOne({loginID: req.params.id},
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            loginID: req.body.loginID,
            startDate: req.body.startDate
        },
        function(err, result) {
            assert.equal(null, err);
            res.json("Updated person with ID: " + req.params.id);
            return;
        }
    );
});

// Command to test the deleting of a person, or DELETE.
// curl -X DELETE http://localhost:3000/person/123
app.delete('/person/:id', (req, res) => {
    db.collection('people').deleteOne({loginID: req.params.id}, function(err, result) {
        assert.equal(null, err);
        res.json("Deleted person with ID: " + req.params.id);
        return;
    });
});

app.get('/person/:id/name', (req, res) => {
    db.collection('people').find().toArray(function (err, result) {
        assert.equal(null, err);

        for (const person of result) {
            if (person["loginID"] == req.params.id) {
                res.json(`${person.firstName} ${person.lastName}`);
                return;
            }
        }
    });
});

app.get('/person/:id/years', (req, res) => {
    db.collection('people').find().toArray(function (err, result) {
        assert.equal(null, err);

        for (const person of result) {
            if (person["loginID"] == req.params.id) {
                // Source: https://stackoverflow.com/a/7091965
                let today = new Date();
                let startDate = new Date(person.startDate);
                let age = today.getFullYear() - startDate.getFullYear();

                var m = today.getMonth() - startDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
                    age--;
                }

                res.send(`Years in organization: ${age}`);
                return;
            }
        }
    });
});

MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds155203.mlab.com:55203/jrk54-cs336', function (err, client) {
  if (err) throw err

  db = client;

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));

  db.collection('people').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
});