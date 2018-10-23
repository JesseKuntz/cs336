// Author: Jesse Kuntz
// Homework 2

const express = require('express');
const app = express();
const port = 3000;
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var PEOPLE_FILE = path.join(__dirname, 'people.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Instructions on how to get or add people.
app.get('/', (req, res) => {
    res.send("/people -- a list of all people objects, and can add new people</br>" +
             "/person/id -- the full record for the person with the given ID that you can edit</br>" +
             "/person/id/name -- the full name (i.e., first & last concatenated into one string) for the person with the given ID</br>" +
             "/person/id/years -- the seniority (i.e., number of years with the organization) of the person with the given ID — Report this as you would report an age (i.e., rounded down to the nearest whole year)."
    );
});

// Formatting is for differentiating between getting the form or getting the data.
app.get('/people', (req, res) => {
    res.format({
        html: function() {
            res.sendFile(path.join(__dirname, 'addPerson.html'));
        },
        json: function () {
            res.sendFile(path.join(__dirname, 'people.json'));
        }
    });
});

// Write to the people.json file with the new person.
app.post('/people', (req, res) => {
    fs.readFile(PEOPLE_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        let people = JSON.parse(data);
        person =
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            loginID: req.body.loginID,
            startDate: req.body.startDate
        }
        people.push(person);
        let newJSON = JSON.stringify(people, null, 2);
        fs.writeFileSync(PEOPLE_FILE, newJSON);
        res.json(person);
    });
});

// Formatting is for differentiating between getting the form or getting the data.
app.get('/person/:id', (req, res) => {
    res.format({
        html: function() {
            res.sendFile(path.join(__dirname, 'getPerson.html'));
        },
        json: function () {
            fs.readFile(path.join(__dirname, 'people.json'), function(err, data) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                let people = JSON.parse(data);
                for (const person of people) {
                    console.log(person);
                    if (person["loginID"] == req.params.id) {
                        res.json(person);
                        return;
                    }
                }
            });
        }
    });
});

// Command to test the updating of a person, or PUT.
// curl -X PUT -H "Content-Type: application/json" -d '{"firstName":"Tim","lastName":"Rogers","loginID":"123","startDate":"1963-08-28"}' http://localhost:3000/person/123
app.put('/person/:id', (req, res) => {
    fs.readFile(PEOPLE_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        let people = JSON.parse(data);

        for (const person of people) {
            if (person["loginID"] == req.params.id) {
                person.firstName = req.body.firstName;
                person.lastName = req.body.lastName;
                person.startDate = req.body.startDate;

                let newJSON = JSON.stringify(people, null, 2);
                fs.writeFileSync(PEOPLE_FILE, newJSON);

                res.json(person);
                return;
            }
        }
    });
});

// Command to test the deleting of a person, or DELETE.
// curl -X DELETE http://localhost:3000/person/80
app.delete('/person/:id', (req, res) => {
    fs.readFile(PEOPLE_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        let people = JSON.parse(data);

        for (let i = 0, len = people.length; i < len; i++) {
            if (people[i]["loginID"] == req.params.id) {
                let person = people[i];

                // DELETE this person
                people.splice(i, 1);

                let newJSON = JSON.stringify(people, null, 2);
                fs.writeFileSync(PEOPLE_FILE, newJSON);

                res.json(person);
                return;
            }
        }
    });
});

// LEFT AS BEFORE (but now read from the people.json file)
app.get('/person/:id/name', (req, res) => {
    fs.readFile(PEOPLE_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        let people = JSON.parse(data);
        for (const person of people) {
            if (person["loginID"] == req.params.id) {
                res.send(`${person.firstName} ${person.lastName}`);
                return;
            }
        }
    });
});

app.get('/person/:id/years', (req, res) => {
    fs.readFile(PEOPLE_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        let people = JSON.parse(data);
        for (const person of people) {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));