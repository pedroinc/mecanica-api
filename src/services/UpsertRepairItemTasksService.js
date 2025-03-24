// type ItemTask = {
//   id?: String;
//   name: String;
//   description: String;
//   price: Number;
//   discount: Number;
//   repairId: String;
// };

const RepairRepository = require("../repositories/RepairRepository");

const repairRepository = new RepairRepository();

class UpsertRepairItemTasksService {
  async execute(itemTask) {
    return await repairRepository.upsertItemTask(itemTask);
  }
}

module.exports = UpsertRepairItemTasksService;
