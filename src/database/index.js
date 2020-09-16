const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Vehicle = require('../models/Vehicle');
const Customer = require('../models/Customer');
const Service = require('../models/Service');

const connection = new Sequelize(dbConfig);

Vehicle.init(connection);
Customer.init(connection);
Service.init(connection);

module.exports = connection;