const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const connection = new Sequelize(dbConfig);

const Customer = require('../models/Customer.js');
const VehicleBrand = require('../models/VehicleBrand.js');
const VehicleModel = require('../models/VehicleModel.js');
const Vehicle = require('../models/Vehicle.js');
const Repair = require('../models/Repair.js');
const User = require('../models/User.js');
const RepairItemPart = require('../models/RepairItemPart.js');
const RepairItemTask = require('../models/RepairItemTask.js');

Customer.init(connection);
VehicleBrand.init(connection);
VehicleModel.init(connection);
Vehicle.init(connection);
Repair.init(connection);
RepairItemTask.init(connection);
RepairItemPart.init(connection);
User.init(connection);

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

module.exports = connection;
