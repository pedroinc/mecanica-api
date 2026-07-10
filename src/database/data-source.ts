import 'reflect-metadata';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

import Customer from '../entities/Customer';
import VehicleBrand from '../entities/VehicleBrand';
import VehicleModel from '../entities/VehicleModel';
import Vehicle from '../entities/Vehicle';
import Repair from '../entities/Repair';
import RepairItemPart from '../entities/RepairItemPart';
import RepairItemTask from '../entities/RepairItemTask';
import User from '../entities/User';

const entities = [
  Customer,
  VehicleBrand,
  VehicleModel,
  Vehicle,
  Repair,
  RepairItemPart,
  RepairItemTask,
  User,
];

const migrations = [path.join(__dirname, 'migrations', '*.{ts,js}')];

const dataSourceOptions: DataSourceOptions =
  process.env.DB_DIALECT === 'better-sqlite3'
    ? {
        type: 'better-sqlite3',
        database: process.env.DB_NAME || './mecanica.sqlite',
        entities,
        migrations,
        logging: process.env.NODE_ENV !== 'production',
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities,
        migrations,
        logging: process.env.NODE_ENV !== 'production',
      };

export const AppDataSource = new DataSource(dataSourceOptions);
