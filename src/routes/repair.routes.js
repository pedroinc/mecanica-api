const express = require('express');

const Repair = require('../models/Repair');
const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');
const RepairItemPart = require('../models/RepairItemPart');
const RepairItemTask = require('../models/RepairItemTask');

const CreateRepairService = require('../services/CreateRepairService');
const UpsertRepairItemPartsService = require('../services/UpsertRepairItemPartsService');
const UpsertRepairItemTasksService = require('../services/UpsertRepairItemTasksService');

const repairRouter = express.Router();
const createRepairService = new CreateRepairService();
const upsertRepairItemPartsService = new UpsertRepairItemPartsService();
const upsertRepairItemTasksService = new UpsertRepairItemTasksService();

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

repairRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const repairs = await Repair.findOne({
      where: {
        id,
      },
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
    const { id, name, description, price, discount } = req.body;

    const itemTask = await upsertRepairItemTasksService.execute({
      id,
      name,
      description,
      price,
      discount,
      repairId,
    });
    return res.json(itemTask);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
});

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
