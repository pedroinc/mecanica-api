const express = require('express');
const VehicleRepository = require('../repositories/VehicleRepository');
const CreateVehicleService = require('../services/CreateVehicleService');
const CustomerRepository = require('../repositories/CustomerRepository');

const vehicleRouter = express.Router();
const vehicleRepository = new VehicleRepository();
const customerRepository = new CustomerRepository();
const createVehicleService = new CreateVehicleService();

vehicleRouter.get('/', async (req, res) => {
  try {
    const { customerId } = req.query;

    console.log('customerId', customerId);

    if (customerId) {
      const customer = await customerRepository.findById(customerId);
      if (!customer) throw Error('customer id invalid');

      const vehicle = await vehicleRepository.findByCustomerId(
        customer.id,
      );
      return res.send(vehicle);
    }

    const vehicles = await vehicleRepository.listAll();
    return res.send(vehicles);
  } catch (error) {
    console.error('error creating a customer: ', error);
    return res.status(500).send({ error });
  }
});

vehicleRouter.post('/', async (req, res) => {
  try {
    const {
      plate,
      name,
      vin,
      modelYear,
      factoryYear,
      vehicleModelId,
      customerId,
    } = req.body;
    const vehicle = await createVehicleService.execute({
      plate,
      name,
      vin,
      modelYear,
      factoryYear,
      vehicleModelId,
      customerId,
    });
    return res.json(vehicle);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = vehicleRouter;
