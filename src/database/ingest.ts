import 'reflect-metadata';
import 'dotenv/config';
import { faker } from '@faker-js/faker';

import { AppDataSource } from './data-source';
import VehicleBrand from '../entities/VehicleBrand';
import VehicleModel from '../entities/VehicleModel';

import CreateCustomerService from '../services/CreateCustomerService';
import CreateVehicleService from '../services/CreateVehicleService';
import CreateRepairService from '../services/CreateRepairService';

// 2: 'NEJ5769',
// 3: 'HZL4740'
const mockedVehicle = {
  plate: 'NAK3218',
  factoryYear: 2009,
  modelYear: 2009,
};

(async () => {
  try {
    await AppDataSource.initialize();
    console.log('Connection has been established successfully.');

    await AppDataSource.synchronize(true);
    console.log('All models were synchronized successfully.');

    const vehicleBrandRepository = AppDataSource.getRepository(VehicleBrand);
    const vehicleModelRepository = AppDataSource.getRepository(VehicleModel);

    // begin ingest
    const fiat = await vehicleBrandRepository.save(
      vehicleBrandRepository.create({ name: 'Fiat' }),
    );
    const fiatModels = await vehicleModelRepository.save(
      vehicleModelRepository.create([
        { name: 'Palio', vehicleBrand: { id: fiat.id } },
        { name: 'Siena', vehicleBrand: { id: fiat.id } },
        { name: 'Uno', vehicleBrand: { id: fiat.id } },
        { name: 'Stilo', vehicleBrand: { id: fiat.id } },
        { name: 'Mobi', vehicleBrand: { id: fiat.id } },
      ]),
    );

    const ford = await vehicleBrandRepository.save(
      vehicleBrandRepository.create({ name: 'Ford' }),
    );

    const fordModels = await vehicleModelRepository.save(
      vehicleModelRepository.create([
        { name: 'EcoSport', vehicleBrand: { id: ford.id } },
        { name: 'Fusion', vehicleBrand: { id: ford.id } },
        { name: 'Focus', vehicleBrand: { id: ford.id } },
        { name: 'Fiesta', vehicleBrand: { id: ford.id } },
        { name: 'Ford Ka Hatch', vehicleBrand: { id: ford.id } },
        { name: 'Ford Ka Sedan', vehicleBrand: { id: ford.id } },
      ]),
    );

    const createCustomerService = new CreateCustomerService();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const newCustomer = await createCustomerService.execute({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName,
        lastName,
      }),
      phone: faker.phone.number(),
    });

    const wantedVehicleModel = await vehicleModelRepository.findOne({
      where: {
        name: 'Palio',
      },
    });
    const createVehicleService = new CreateVehicleService();
    const newVehicle = await createVehicleService.execute({
      plate: mockedVehicle.plate,
      name: faker.vehicle.vehicle(),
      vin: faker.vehicle.vin(),
      modelYear: mockedVehicle.modelYear,
      factoryYear: mockedVehicle.factoryYear,
      vehicleModelId: wantedVehicleModel!.id,
      customerId: newCustomer.id,
    });

    const createRepairService = new CreateRepairService();
    const newRepair = await createRepairService.execute({
      description: 'repair description',
      discount: 0,
      total: undefined,
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
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
