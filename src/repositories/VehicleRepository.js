const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');

class VehicleRepository {
  async findByPlate(plate) {
    return await Vehicle.findOne({
      where: {
        plate,
      },
    });
  }

  async listAll() {
    return await Vehicle.findAll(
      {
        include: Customer,
        limit: 10,
        // order: [['name', 'asc']]
      }
    );
  }

  async create(vehicle) {
    return await Vehicle.create(vehicle);
  }
}

module.exports = VehicleRepository;
