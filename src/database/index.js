const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const sequelize = new Sequelize(dbConfig);

const VBrand = require('../models/VBrand.js');
const VModel = require('../models/VModel.js');
const Vehicle = require('../models/Vehicle.js');
const Customer  = require('../models/Customer.js');
const Service = require('../models/Service.js');
// const ServiceItem from '../repositories/ServiceItem');

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database/mecanica.sqlite',
//     define: {
//         timestamps: true,
//         underscored: true
//       }
//   });

// VBrand.hasMany(VModel);
// VModel.belongsTo(VBrand);

// Vehicle.hasOne(VModel);

// Customer.hasMany(Vehicle);
// Vehicle.belongsTo(Customer);

// Service.hasOne(Customer);
// Service.hasOne(Vehicle);

// Vehicle.hasMany(Service);
// Customer.hasMany(Service);

VBrand.init(sequelize);
VModel.init(sequelize);
Vehicle.init(sequelize);
Customer.init(sequelize);
Service.init(sequelize);

module.exports = sequelize;