import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';

import Customer from '../models/Customer';
import VehicleBrand from '../models/VehicleBrand';
import VehicleModel from '../models/VehicleModel';
import Vehicle from '../models/Vehicle';
import Repair from '../models/Repair';
import User from '../models/User';
import RepairItemPart from '../models/RepairItemPart';
import RepairItemTask from '../models/RepairItemTask';

const connection = new Sequelize(dbConfig);

Customer.initModel(connection);
VehicleBrand.initModel(connection);
VehicleModel.initModel(connection);
Vehicle.initModel(connection);
Repair.initModel(connection);
RepairItemTask.initModel(connection);
RepairItemPart.initModel(connection);
User.initModel(connection);

VehicleBrand.hasMany(VehicleModel);
VehicleModel.belongsTo(VehicleBrand);

Vehicle.belongsTo(Customer);
Customer.hasMany(Vehicle);

Repair.belongsTo(Vehicle);
Repair.belongsTo(Customer);

Vehicle.hasOne(VehicleModel);
Vehicle.hasMany(Repair);
Customer.hasMany(Repair);

RepairItemTask.belongsTo(Repair);
RepairItemPart.belongsTo(Repair);

Repair.hasMany(RepairItemTask);
Repair.hasMany(RepairItemPart);

export default connection;
