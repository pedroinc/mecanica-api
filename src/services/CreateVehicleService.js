const VehicleRepository = require("../repositories/VehicleRepository");

const vehicleRepository = new VehicleRepository();

class CreateVehicleService {
  async execute(newVehicle) {
    // if (!newVehicle.email) throw Error('The email cannot be empty!');

    const vehicle = await vehicleRepository.findByPlate(newVehicle.licensePlate);
    if (vehicle) {
      throw Error('This plate is already registered!');
    }
    await vehicleRepository.create(newVehicle);
  }
}

module.exports = CreateVehicleService;
