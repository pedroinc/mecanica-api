import { AppDataSource } from '../database/data-source';
import Vehicle from '../entities/Vehicle';

class VehicleRepository {
  private repository = AppDataSource.getRepository(Vehicle);

  async findByPlate(plate: string) {
    return await this.repository.findOne({
      where: {
        plate,
      },
    });
  }

  async findByCustomerId(customerId: string) {
    return await this.repository.find({
      relations: { customer: true },
      where: {
        customer: { id: customerId },
      },
    });
  }

  async listAll() {
    return await this.repository.find({
      take: 10,
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
    const { vehicleModelId, customerId, ...rest } = vehicle;
    const entity = this.repository.create({
      ...rest,
      vehicleModel: vehicleModelId ? { id: vehicleModelId } : null,
      customer: customerId ? { id: customerId } : null,
    });
    return await this.repository.save(entity);
  }
}

export default VehicleRepository;
