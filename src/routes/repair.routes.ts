import express from 'express';

import { AppDataSource } from '../database/data-source';
import Repair from '../entities/Repair';

import CreateRepairService from '../services/CreateRepairService';
import UpsertRepairItemPartsService from '../services/UpsertRepairItemPartsService';
import UpsertRepairItemTasksService from '../services/UpsertRepairItemTasksService';

const repairRouter = express.Router();
const repairRepository = AppDataSource.getRepository(Repair);
const createRepairService = new CreateRepairService();
const upsertRepairItemPartsService = new UpsertRepairItemPartsService();
const upsertRepairItemTasksService = new UpsertRepairItemTasksService();

repairRouter.get('/', async (req, res) => {
  try {
    const repairs = await repairRepository.find({
      relations: { vehicle: true, customer: true },
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

    const repairs = await repairRepository.findOne({
      where: {
        id,
      },
      relations: {
        vehicle: true,
        customer: true,
        repairItemTasks: true,
        repairItemParts: true,
      },
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
    return res.status(500).send({ error: (error as Error).message });
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
    return res.status(500).send({ error: (error as Error).message });
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
    return res.status(500).send({ error: (error as Error).message });
  }
});

export default repairRouter;
