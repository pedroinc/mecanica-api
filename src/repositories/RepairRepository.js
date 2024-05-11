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
      return await RepairItemPart.update(itemPart, {
        where: itemPart.id,
        returning: true,
      });
    }
    return await RepairItemPart.create(itemPart);
    // return await RepairItemPart.create(itemPart);
  }

  async upsertItemTask(itemTask) {
    return await RepairItemTask.upsert(itemTask);
    // return await RepairItemTask.create(itemTask);
  }
}

module.exports = RepairRepository;
