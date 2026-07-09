import RepairRepository from '../repositories/RepairRepository';

const repairRepository = new RepairRepository();

type CreateRepairInput = {
  description?: string;
  discount?: number;
  total?: number | null;
  vehicleId?: string;
  customerId?: string;
};

class CreateRepairService {
  async execute({
    description,
    discount,
    total,
    vehicleId,
    customerId,
  }: CreateRepairInput) {
    return await repairRepository.create({
      description,
      discount,
      total,
      vehicleId,
      customerId,
    });
  }
}

export default CreateRepairService;
