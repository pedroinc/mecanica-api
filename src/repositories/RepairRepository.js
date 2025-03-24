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

      if (!existingItem) {
        throw Error('ERROR_UPDATING_REPAIR_ITEM_PART');
      }

      console.log('update itemPart', itemPart);
      existingItem.set(itemPart);
      return await existingItem.save();
    }
    console.log('create itemPart', itemPart);
    return await RepairItemPart.create(itemPart);
  }

  async upsertItemTask(itemTask) {
    console.log('RepairRepo upsertItemTask', itemTask);

    if (itemTask.id) {
      const existingItem = await RepairItemTask.findByPk(itemTask.id);

      if (!existingItem) {
        throw Error('ERROR_UPDATING_REPAIR_ITEM_TASK');
      }

      console.log('update itemTask', itemTask);
      existingItem.set(itemTask);
      return await existingItem.save();
    }
    console.log('create itemTask', itemTask);
    return await RepairItemTask.create(itemTask);
  }
}

module.exports = RepairRepository;
