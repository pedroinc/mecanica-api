const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');
const VehicleModel = require('../models/VehicleModel');

class VehicleRepository {
  async findByPlate(plate) {
    return await Vehicle.findOne({
      where: {
        plate,
      },
    });
  }

  async findByCustomerId(customerId) {
    return await Vehicle.findAll({
      include: [
        Customer,
        // {
        //   required: false,
        //   model: VehicleModel,
        //   where: {
        //     id: Vehicle.vehicleModelId,
        //   },
        // },
      ],
      where: {
        customerId,
      },
    });
  }

  //   Catalog.find({where:
  //     {id: itemId},
  //     include: {
  //         model: models.ProductCategory,
  //         where: {
  //           language_id: {$col: 'Catalog.language_id'}
  //         }
  //     }
  // })

  async listAll() {
    return await Vehicle.findAll({
      limit: 10,
      // order: [['name', 'asc']]
    });
  }

  async create(vehicle) {
    return await Vehicle.create(vehicle);
  }
}

module.exports = VehicleRepository;
