const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');
const Repair = require('../models/Repair');
const RepairItemPart = require('../models/RepairItemPart');
const RepairItemTask = require('../models/RepairItemTask');

class RepairRepository {
  async findByCustomer(customerId) {
    return await Repair.findOne({
      where: {
        customerId,
      },
    });
  }

  async findByVehicle(vehicleId) {
    return await Repair.findOne({
      where: {
        vehicleId,
      },
    });
  }

  async listAll() {
    return await Repair.findAll({
      include: [Customer, Vehicle],
      limit: 10,
      // order: [['name', 'asc']]
    });
  }

  async create(repair) {
    return await Repair.create(repair);
  }

  async upsertItemPart(itemPart) {
    if (itemPart.id) {
      const existingItem = await RepairItemPart.findByPk(itemPart.id);
      if(!existingItem) throw Error('Error while updating item part');

      console.log('update', itemPart);

      existingItem.set(itemPart);
      return await existingItem.save();
    }
    console.log('create', itemPart);
    return await RepairItemPart.create(itemPart);
  }

  async upsertItemTask(itemTask) {
    return await RepairItemTask.upsert(itemTask);
    // return await RepairItemTask.create(itemTask);
  }
}

module.exports = RepairRepository;
