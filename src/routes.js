const express = require('express');

const routes = express.Router();

const services = [
  {
    id: 123,
    vehicle: {
      countryID: '',
      name: ''
    },
    owner: {
      name: '',
      phone: '',
      cellphone: '',
      email: ''
    },
    creationDate: Date.now(),
    creationDate: Date.now(),
    doneDate: Date.now(),
  }
];

routes.get('/', (req, res) => {
  return res.json(services)
});

module.exports = routes;