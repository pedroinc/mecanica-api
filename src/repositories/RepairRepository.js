const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');
const Repair = require('../models/Repair');

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

  async create(vehicleService) {
    return await Repair.create(vehicleService);
  }
}

module.exports = RepairRepository;
