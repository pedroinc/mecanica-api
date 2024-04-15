const express = require('express');
const VehicleRepository = require('../repositories/VehicleRepository');
const CreateVehicleService = require('../services/CreateVehicleService');

const vehicleRouter = express.Router();
const vehicleRepository = new VehicleRepository();
const createVehicleService = new CreateVehicleService();

vehicleRouter.get('/', async (req, res) => {
  try {
    const vehicles = await vehicleRepository.listAll();
    return res.send(vehicles);
  } catch (error) {
    console.error('error creating a customer: ', error);
    return res.status(500).send({ error });
  }
});

vehicleRouter.post('/', async (req, res) => {
  try {
    const { plate, name, vin, modelYear, factoryYear, vmodelId, customerId } =
      req.body;
    const vehicle = await createVehicleService.execute({
      plate,
      name,
      vin,
      modelYear,
      factoryYear,
      vmodelId,
      customerId,
    });
    return res.json(vehicle);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = vehicleRouter;
