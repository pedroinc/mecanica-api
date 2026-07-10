import { MessageUtils } from '../config/messages';
import VehicleRepository from '../repositories/VehicleRepository';

const vehicleRepository = new VehicleRepository();

type CreateVehicleInput = {
  plate: string;
  name?: string;
  vin?: string;
  modelYear?: number;
  factoryYear?: number;
  vehicleModelId?: string;
  customerId?: string;
};

class CreateVehicleService {
  async execute({
    plate,
    name,
    vin,
    modelYear,
    factoryYear,
    vehicleModelId,
    customerId,
  }: CreateVehicleInput) {
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

export default CreateVehicleService;
