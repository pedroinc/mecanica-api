import Customer from '../models/Customer';
import Vehicle from '../models/Vehicle';
import Repair from '../models/Repair';
import RepairItemPart from '../models/RepairItemPart';
import RepairItemTask from '../models/RepairItemTask';

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
  async findByCustomer(customerId: string) {
    return await Repair.findOne({
      where: {
        customerId,
      },
    });
  }

  async findByVehicle(vehicleId: string) {
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
    });
  }

  async create(repair: {
    description?: string;
    discount?: number;
    total?: number | null;
    vehicleId?: string;
    customerId?: string;
  }) {
    return await Repair.create(repair);
  }

  async upsertItemPart(itemPart: ItemPart) {
    if (itemPart.id) {
      const existingItem = await RepairItemPart.findByPk(itemPart.id);

      if (!existingItem) {
        throw Error('ERROR_UPDATING_REPAIR_ITEM_PART');
      }

      console.log('update itemPart', itemPart);
      existingItem.set(itemPart);
      return await existingItem.save();
    }
    console.log('create itemPart', itemPart);
    return await RepairItemPart.create(itemPart);
  }

  async upsertItemTask(itemTask: ItemTask) {
    console.log('RepairRepo upsertItemTask', itemTask);

    if (itemTask.id) {
      const existingItem = await RepairItemTask.findByPk(itemTask.id);

      if (!existingItem) {
        throw Error('ERROR_UPDATING_REPAIR_ITEM_TASK');
      }

      console.log('update itemTask', itemTask);
      existingItem.set(itemTask);
      return await existingItem.save();
    }
    console.log('create itemTask', itemTask);
    return await RepairItemTask.create(itemTask);
  }
}

export default RepairRepository;
