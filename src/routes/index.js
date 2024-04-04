const express = require('express');
const sequelize = require('../database/index');
const routes = express.Router();

const services = [
  {
    id: 123,
    vehicle: {
      countryID: '',
      name: '',
    },
    owner: {
      name: '',
      phone: '',
      cellphone: '',
      email: '',
    },
    creationDate: Date.now(),
    creationDate: Date.now(),
    doneDate: Date.now(),
  },
];

routes.use('/login', require('./login.routes'));
routes.use('/clientes', require('./customer.routes'));

routes.get('/db/init', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
    return res.json(services);
  } catch (error) {
    const prefix = 'Unable to connect to the database!';
    console.error(prefix, error);
    return res.json({ error: prefix });
  }
  // return res.json(services)
});

module.exports = routes;
