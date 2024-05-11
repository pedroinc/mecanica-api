const RepairRepository = require("../repositories/RepairRepository");

const repairRepository = new RepairRepository();


class UpsertRepairItemTasksService {
  async execute(itemTask) {

    return await repairRepository.UpsertRepairItemTasksService(itemTask);

    // items.map(repairItemTask => {
    //   if (repairItemTask.id) {
    //     // update item
    //   } else {
    //     // create item
    //   }
    // });
  }
}

module.exports = UpsertRepairItemTasksService;
