require('dotenv').config();

const connection = require('./index');

const VehicleBrand = require('../models/VehicleBrand');
const VehicleModel = require('../models/VehicleModel');

const CreateCustomerService = require('../services/CreateCustomerService');
const CreateVehicleService = require('../services/CreateVehicleService');

const { faker } = require('@faker-js/faker');
const CreateRepairService = require('../services/CreateRepairService');

// 2: 'NEJ5769',
// 3: 'HZL4740'
const mockedVehicle = {
  plate: 'NAK3218',
  factoryYear: 2009,
  modelYear: 2009,
};

(async () => {
  try {

    await connection.authenticate();
    console.log('Connection has been established successfully.');

    await connection.sync({ force: true });
    console.log('All models were synchronized successfully.');


    // begin ingest
    const fiat = await VehicleBrand.create({ name: 'Fiat' });
    const fiatModels = await VehicleModel.bulkCreate([
      { name: 'Palio', vehicleBrandId: fiat.id },
      { name: 'Siena', vehicleBrandId: fiat.id },
      { name: 'Uno', vehicleBrandId: fiat.id },
      { name: 'Stilo', vehicleBrandId: fiat.id },
      { name: 'Mobi', vehicleBrandId: fiat.id },
    ]);

    const ford = await VehicleBrand.create({ name: 'Ford' });

    const fordModels = await VehicleModel.bulkCreate([
      { name: 'EcoSport', vehicleBrandId: ford.id },
      { name: 'Fusion', vehicleBrandId: ford.id },
      { name: 'Focus', vehicleBrandId: ford.id },
      { name: 'Fiesta', vehicleBrandId: ford.id },
      { name: 'Ford Ka Hatch', vehicleBrandId: ford.id },
      { name: 'Ford Ka Sedan', vehicleBrandId: ford.id },
    ]);

    const createCustomerService = new CreateCustomerService();
    const newCustomer = await createCustomerService.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    });

    const wantedVehicleModel = await VehicleModel.findOne({
      where: {
        name: 'Palio',
      }
    })
    const createVehicleService = new CreateVehicleService();
    const newVehicle = await createVehicleService.execute({
      plate: mockedVehicle.plate,
      name: faker.vehicle.vehicle(),
      vin: faker.vehicle.vin(),
      modelYear: mockedVehicle.modelYear,
      factoryYear: mockedVehicle.factoryYear,
      vehicleModelId: wantedVehicleModel.id,

      customerId: newCustomer.id,
    });

    const createRepairService = new CreateRepairService();
    const newRepair = await createRepairService.execute({
      description: 'repair description',
      discount: 0,
      total: null,
      vehicleId: newVehicle.id,
      customerId: newCustomer.id,
    });

    // end ingest

    const insertedData = {
      ingested: {
        [fiat.name]: fiatModels,
        [ford.name]: fordModels,
        vehicle: newVehicle,
        repair: newRepair,
      },
    };

    console.log('ingested mock data');
    console.log(insertedData);
  } catch (error) {
    console.error(error);
  }
})();
