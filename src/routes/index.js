const express = require('express');

const isTokenValid = require('../middlewares/isTokenValid');

const appRouter = express.Router();

appRouter.use('/customers', isTokenValid, require('./customer.routes'));
appRouter.use('/vehicles', isTokenValid, require('./vehicle.routes'));
appRouter.use('/repairs', isTokenValid, require('./repair.routes'));
appRouter.use('/auth', require('./auth.routes'));
// app.use('/users', require('./user.routes'));

module.exports = appRouter;
