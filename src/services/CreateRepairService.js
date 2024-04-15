const RepairRepository = require("../repositories/RepairRepository");

const repairRepository = new RepairRepository();

class CreateRepairService {
  async execute({
    description,
    discount,
    total,
    vehicleId,
    customerId,
  }) {
    return await repairRepository.create({
      description,
      discount,
      total,
      vehicleId,
      customerId,
    });
  }
}

module.exports = CreateRepairService;
