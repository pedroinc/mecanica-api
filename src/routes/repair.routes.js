const express = require('express');

const Repair = require('../models/Repair');
const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');
const CreateRepairService = require('../services/CreateRepairService');

const repairRouter = express.Router();
const createRepairService = new CreateRepairService();

repairRouter.get('/', async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      include: [Vehicle, Customer],
    });
    return res.send(repairs);
  } catch (error) {
    console.error('error creating a vehicle repair: ', error);
    return res.status(500).send({ error });
  }
});

repairRouter.post('/', async (req, res) => {
  try {
    const { description, total, vehicleId, customerId } = req.body;

    const repair = await createRepairService.execute({
      description,
      total,
      vehicleId,
      customerId,
    });
    return res.json(repair);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = repairRouter;
