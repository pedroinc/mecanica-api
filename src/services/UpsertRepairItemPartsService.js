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
    // const unresolvedUpserts = [];

    // items.map(itemPart => {
    //   unresolvedUpserts.push(repairRepository.upsertItemPart(itemPart));
    // });

    // return Promise.all(unresolvedUpserts);
  }
}

module.exports = UpsertRepairItemPartsService;
