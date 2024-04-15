const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const connection = new Sequelize(dbConfig);

const Customer = require('../models/Customer.js');
const VBrand = require('../models/VBrand.js');
const VModel = require('../models/VModel.js');
const Vehicle = require('../models/Vehicle.js');
const Repair = require('../models/Repair.js');
const User = require('../models/User.js');

Customer.init(connection);
VBrand.init(connection);
VModel.init(connection);
Vehicle.init(connection);
Repair.init(connection);
User.init(connection);

VBrand.hasMany(VModel);
VModel.belongsTo(VBrand);

Vehicle.belongsTo(Customer);
Customer.hasMany(Vehicle);

Repair.belongsTo(Vehicle);
Repair.belongsTo(Customer);

Vehicle.hasMany(Repair);
Customer.hasMany(Repair);

module.exports = connection;
