// import the pets array from data.js
const pets = require ('./data');

// init express app
const express = require ('express');
const app = express ();

const PORT = 8080;

// GET - / - returns homepage
// app.get ('/', (req, res) => {
//   // serve up the public folder as static index.html file

// });

// hello world route
app.get ('/api', (req, res) => {
  res.json ('Hello World!');
});

// get all pets from the database
app.get ('/api/v1/pets', (req, res) => {
  // send the pets array as a response
  res.json (pets);
});

// get pet by owner with query string
app.get ('/api/v1/pets/owner', (req, res) => {
  // get the owner from the request
  const owner = req.query.owner;

  if (!owner) {
    return res.status (400).json ({error: `${owner} is missing`});
  }

  // find the pet in the pets array
  const pet = pets.find (pet => pet.owner === owner);

  if (!pet) {
    return res.status (400).json ({error: `${pet} is missing`});
  }
  // send the pet as a response
  res.json ({pet: pet});
});

// get pet by name
app.get ('/api/v1/pets/:name', (req, res) => {
  // get the name from the request
  const name = req.query.name;

  // find the pet in the pets array
  const pet = pets.find (pet => pet.name === name);

  // send the pet as a response
  res.send ({name: pet});
});

app.listen (PORT, () => {
  console.log ('Server is listening on port ' + PORT);
});

module.exports = app;
