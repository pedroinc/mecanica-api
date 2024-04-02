const express = require('express');
const sequelize = require('./database/index');

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

routes.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // await sequelize.sync({ force: true });
    // console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  // return res.json(services)
});


module.exports = routes;