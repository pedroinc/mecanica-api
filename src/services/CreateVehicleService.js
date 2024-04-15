const VehicleRepository = require('../repositories/VehicleRepository');

const vehicleRepository = new VehicleRepository();

class CreateVehicleService {
  async execute({
    plate,
    name,
    vin,
    modelYear,
    factoryYear,
    vmodelId,
    customerId,
  }) {
    const vehicle = await vehicleRepository.findByPlate(plate);
    if (vehicle) {
      throw Error('This plate is already registered!');
    }
    return await vehicleRepository.create({
      plate,
      name,
      vin,
      modelYear,
      factoryYear,
      vmodelId,
      customerId,
    });
  }
}

module.exports = CreateVehicleService;
