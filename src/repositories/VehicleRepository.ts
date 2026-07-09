import Customer from '../models/Customer';
import Vehicle from '../models/Vehicle';

class VehicleRepository {
  async findByPlate(plate: string) {
    return await Vehicle.findOne({
      where: {
        plate,
      },
    });
  }

  async findByCustomerId(customerId: string) {
    return await Vehicle.findAll({
      include: [Customer],
      where: {
        customerId,
      },
    });
  }

  async listAll() {
    return await Vehicle.findAll({
      limit: 10,
    });
  }

  async create(vehicle: {
    plate: string;
    name?: string;
    vin?: string;
    modelYear?: number;
    factoryYear?: number;
    vehicleModelId?: string;
    customerId?: string;
  }) {
    return await Vehicle.create(vehicle);
  }
}

export default VehicleRepository;
