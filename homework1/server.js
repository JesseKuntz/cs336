const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("/people -- a list of all people objects</br>" +
             "/person/id -- the full record for the person with the given ID</br>" +
             "/person/id/name -- the full name (i.e., first & last concatenated into one string) for the person with the given ID</br>" +
             "/person/id/years -- the seniority (i.e., number of years with the organization) of the person with the given ID — Report this as you would report an age (i.e., rounded down to the nearest whole year)."
    );
});

app.get('/people', (req, res) => {
    res.json(people);
});

app.get('/person/:id', (req, res) => {
    for (const person of people) {
        if (person["loginID"] == req.params.id) res.json(person);
    }

    res.sendStatus(404);
});

app.get('/person/:id/name', (req, res) => {
    for (const person of people) {
        if (person["loginID"] == req.params.id) res.send(`${person.firstName} ${person.lastName}`);
    }

    res.sendStatus(404);
});

app.get('/person/:id/years', (req, res) => {
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

            res.send(`Years in organization: ${age}`)
        }
    }

    res.sendStatus(404);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var people = [
    {
        firstName: "Jesse",
        lastName: "Kuntz",
        loginID: "42",
        startDate: "1996-12-30"
    },

    {
        firstName: "Aaron",
        lastName: "Kuntz",
        loginID: "100",
        startDate: "1999-10-20"
    }
]