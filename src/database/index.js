const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Vehicle = require('../models/Customer');

const connection = new Sequelize(dbConfig);

Vehicle.init(connection);

module.exports = connection;