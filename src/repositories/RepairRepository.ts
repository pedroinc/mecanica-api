import { AppDataSource } from '../database/data-source';
import Repair from '../entities/Repair';
import RepairItemPart from '../entities/RepairItemPart';
import RepairItemTask from '../entities/RepairItemTask';

type ItemPart = {
  id?: string;
  name: string;
  description?: string;
  numItems?: number;
  priceAuthentic?: number;
  priceNotAuthentic?: number;
  useAuthentic?: boolean;
  repairId?: string;
};

type ItemTask = {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  discount?: number;
  repairId?: string;
};

class RepairRepository {
  private repository = AppDataSource.getRepository(Repair);
  private repairItemPartRepository = AppDataSource.getRepository(RepairItemPart);
  private repairItemTaskRepository = AppDataSource.getRepository(RepairItemTask);

  async findByCustomer(customerId: string) {
    return await this.repository.findOne({
      where: {
        customer: { id: customerId },
      },
    });
  }

  async findByVehicle(vehicleId: string) {
    return await this.repository.findOne({
      where: {
        vehicle: { id: vehicleId },
      },
    });
  }

  async listAll() {
    return await this.repository.find({
      relations: { customer: true, vehicle: true },
      take: 10,
    });
  }

  async create(repair: {
    description?: string;
    discount?: number;
    total?: number | null;
    vehicleId?: string;
    customerId?: string;
  }) {
    const { vehicleId, customerId, ...rest } = repair;
    const entity = this.repository.create({
      ...rest,
      vehicle: vehicleId ? { id: vehicleId } : null,
      customer: customerId ? { id: customerId } : null,
    });
    return await this.repository.save(entity);
  }

  async upsertItemPart(itemPart: ItemPart) {
    if (itemPart.id) {
      const existingItem = await this.repairItemPartRepository.findOne({
        where: { id: itemPart.id },
      });

      if (!existingItem) {
        throw Error('ERROR_UPDATING_REPAIR_ITEM_PART');
      }

      console.log('update itemPart', itemPart);
      const { repairId, ...rest } = itemPart;
      this.repairItemPartRepository.merge(existingItem, rest);
      return await this.repairItemPartRepository.save(existingItem);
    }
    console.log('create itemPart', itemPart);
    const { repairId, ...rest } = itemPart;
    const entity = this.repairItemPartRepository.create({
      ...rest,
      repair: repairId ? { id: repairId } : null,
    });
    return await this.repairItemPartRepository.save(entity);
  }

  async upsertItemTask(itemTask: ItemTask) {
    console.log('RepairRepo upsertItemTask', itemTask);

    if (itemTask.id) {
      const existingItem = await this.repairItemTaskRepository.findOne({
        where: { id: itemTask.id },
      });

      if (!existingItem) {
        throw Error('ERROR_UPDATING_REPAIR_ITEM_TASK');
      }

      console.log('update itemTask', itemTask);
      const { repairId, ...rest } = itemTask;
      this.repairItemTaskRepository.merge(existingItem, rest);
      return await this.repairItemTaskRepository.save(existingItem);
    }
    console.log('create itemTask', itemTask);
    const { repairId, ...rest } = itemTask;
    const entity = this.repairItemTaskRepository.create({
      ...rest,
      repair: repairId ? { id: repairId } : null,
    });
    return await this.repairItemTaskRepository.save(entity);
  }
}

export default RepairRepository;
