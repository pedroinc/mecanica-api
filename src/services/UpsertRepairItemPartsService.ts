import RepairRepository from '../repositories/RepairRepository';

const repairRepository = new RepairRepository();

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

class UpsertRepairItemPartsService {
  async execute(itemPart: ItemPart) {
    return await repairRepository.upsertItemPart(itemPart);
  }
}

export default UpsertRepairItemPartsService;
