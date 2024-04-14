const express = require('express');
const CustomerRepository = require('../repositories/CustomerRepository');
const CreateCustomerService = require('../services/CreateCustomerService');


const customerRouter = express.Router();
const customerRepository = new CustomerRepository();
const createCustomerService = new CreateCustomerService();

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
    const customer = await createCustomerService.execute({ name, email, phone });
    return res.json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
});

customerRouter.put('/', async (req, res) => {
  try {
    console.log('update customer');
  } catch (error) {
    return res.json({});
  }
});

customerRouter.delete('/', async (req, res) => {
  try {
    console.log('delete customer');
  } catch (error) {
    return res.json({});
  }
});

module.exports = customerRouter;
