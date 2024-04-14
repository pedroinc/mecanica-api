const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const sequelize = new Sequelize(dbConfig);

const Customer = require('../models/Customer.js');
const VBrand = require('../models/VBrand.js');
const VModel = require('../models/VModel.js');
const Vehicle = require('../models/Vehicle.js');
const Service = require('../models/Service.js');
const User = require('../models/User.js');

// VBrand.hasMany(VModel);
// VModel.belongsTo(VBrand);

// Vehicle.hasOne(VModel);

// Customer.hasMany(Vehicle);
// Vehicle.belongsTo(Customer);

// Service.hasOne(Customer);
// Service.hasOne(Vehicle);

// Vehicle.hasMany(Service);
// Customer.hasMany(Service);

Customer.init(sequelize);
VBrand.init(sequelize);
VModel.init(sequelize);
Vehicle.init(sequelize);
Service.init(sequelize);
User.init(sequelize);

module.exports = sequelize;
