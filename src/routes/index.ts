import express from 'express';

import isTokenValid from '../middlewares/isTokenValid';

import customerRouter from './customer.routes';
import vehicleRouter from './vehicle.routes';
import repairRouter from './repair.routes';
import authRouter from './auth.routes';

const appRouter = express.Router();

appRouter.use('/customers', isTokenValid, customerRouter);
appRouter.use('/vehicles', isTokenValid, vehicleRouter);
appRouter.use('/repairs', isTokenValid, repairRouter);
appRouter.use('/auth', authRouter);
// app.use('/users', require('./user.routes'));

export default appRouter;
