const Vehicle = require("../models/Vehicle");

class VehicleRepository {

  async findByPlate(plate) {
    return await Vehicle.findOne({
      where: {
        licensePlate: plate,
      },
    });
  }

  async listAll() {
    return await Vehicle.findAll({ limit: 10, order: [ ['name', 'asc'] ] });
  }

  async create(vehicle) {
    return await Vehicle.create(vehicle);
  }
}

module.exports = VehicleRepository;
