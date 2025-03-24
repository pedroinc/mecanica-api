const { MessageUtils } = require('../config/messages');
const VehicleRepository = require('../repositories/VehicleRepository');

const vehicleRepository = new VehicleRepository();

class CreateVehicleService {
  async execute({
    plate,
    name,
    vin,
    modelYear,
    factoryYear,
    vehicleModelId,
    customerId,
  }) {
    const vehicle = await vehicleRepository.findByPlate(plate);
    if (vehicle) {
      throw Error(MessageUtils.vehicles.error.PLATE_ALREADY_REGISTERED);
    }
    return await vehicleRepository.create({
      plate,
      name,
      vin,
      modelYear,
      factoryYear,
      vehicleModelId,
      customerId,
    });
  }
}

module.exports = CreateVehicleService;
