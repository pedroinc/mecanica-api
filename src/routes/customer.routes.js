const express = require('express');
const Customer = require('../models/Customer');
const CustomerRepository = require('../repositories/CustomerRepository');

const customerRepository = new CustomerRepository();
const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {
  try {
    const customers = await customerRepository.listAll();
    return res.send(customers);
  } catch (error) {
    console.error('error creating a customer: ', error);
    return res.status(500).send({ error });
  }
});

customerRouter.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const customer = await customerRepository.create({ name, email, phone });

    return res.json({ message: 'customer created!', customer });
  } catch (error) {
    // console.error('error creating a customer: ', error);
    return res.status(500).send({ error });
  }
});

// customerRouter.put('/', async (req, res) => {
//   try {
//   } catch (error) {}
//   return res.json({});
// });

// customerRouter.delete('/', async (req, res) => {
//   try {
//   } catch (error) {}
//   return res.json({});
// });

module.exports = customerRouter;
