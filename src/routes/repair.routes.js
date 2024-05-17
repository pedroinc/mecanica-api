const express = require('express');

const Repair = require('../models/Repair');
const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');
const CreateRepairService = require('../services/CreateRepairService');
const UpsertRepairItemPartsService = require('../services/UpsertRepairItemPartsService');
const RepairItemPart = require('../models/RepairItemPart');
const RepairItemTask = require('../models/RepairItemTask');

const repairRouter = express.Router();
const createRepairService = new CreateRepairService();
const upsertRepairItemPartsService = new UpsertRepairItemPartsService();

repairRouter.get('/', async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      include: [Vehicle, Customer, RepairItemTask, RepairItemPart],
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

repairRouter.post('/:repairId/tasks', async (req, res) => {
  try {
    const { repairId } = req.params;
    const { name, description } = req.body;
    // const repair = await createRepairTaskService.execute(repairItemTask);
    return res.json({});
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
});

// {
//   "repairId": "d4285930-c777-4f3e-a4bc-d81b17fe98ad",
//   "name": "filtro do ar condicionado",
//   "description": "descricao do filtro do ar condicionado",
//   "numItems": 1,
//   "authenticPrice": 240.00,
//   "notAuthenticPrice": 180.00,
//   "useAuthentic": true
// }

repairRouter.post('/:repairId/parts', async (req, res) => {
  try {
    const { repairId } = req.params;
    const {
      id,
      name,
      description,
      numItems,
      priceAuthentic,
      priceNotAuthentic,
      useAuthentic,
    } = req.body;
    const itemPart = await upsertRepairItemPartsService.execute({
      id,
      name,
      description,
      numItems,
      priceAuthentic,
      priceNotAuthentic,
      useAuthentic,
      repairId,
    });
    return res.json(itemPart);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = repairRouter;
