// type ItemPart = {
//   id?: String;
//   name: String;
//   description: String;
//   numItems: Number;
//   priceAuthentic: Number;
//   priceNotAuthentic: Number;
//   useAuthentic: Boolean;
//   repairId: String;
// };

const RepairRepository = require('../repositories/RepairRepository');

const repairRepository = new RepairRepository();

class UpsertRepairItemPartsService {
  async execute(itemPart) {
    return await repairRepository.upsertItemPart(itemPart);
  }
}

module.exports = UpsertRepairItemPartsService;
