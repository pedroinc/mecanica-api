import RepairRepository from '../repositories/RepairRepository';

const repairRepository = new RepairRepository();

type ItemTask = {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  discount?: number;
  repairId?: string;
};

class UpsertRepairItemTasksService {
  async execute(itemTask: ItemTask) {
    return await repairRepository.upsertItemTask(itemTask);
  }
}

export default UpsertRepairItemTasksService;
