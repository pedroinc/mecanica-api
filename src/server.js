require('dotenv').config();

const express = require('express');
const cors = require('cors')
const connection = require('./database/index');
const app = express();
const isTokenValid = require('./middlewares/isTokenValid');
const VehicleBrand = require('./models/VehicleBrand');
const VehicleModel = require('./models/VehicleModel');
const Customer = require('./models/Customer');

const config = {
  hostname: '0.0.0.0',
  port: process.env.PORT,
};

app.use(express.json());
app.use(cors())

app.get('/', async (req, res) => {
  try {
    return res.json({ message: 'Mecanica API - Home' });
  } catch (error) {
    return res.json({ error });
  }
});

app.get('/db/init', async (req, res) => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
    await connection.sync({ force: true });
    console.log('All models were synchronized successfully.');
    return res.json({ message: 'All models were synchronized successfully.' });
  } catch (error) {
    const prefix = 'Unable to connect to the database!';
    console.error(prefix, error);
    return res.json({ error: prefix });
  }
});

app.get('/ingest', async (req, res) => {
  console.log('/ingest');

  try {
    const fiat = await VehicleBrand.create({ name: 'Fiat' });

    const fiatModels = await VehicleModel.bulkCreate([
      { name: 'Palio', vehicleBrandId: fiat.id },
      { name: 'Siena', vehicleBrandId: fiat.id },
      { name: 'Uno', vehicleBrandId: fiat.id },
      { name: 'Stilo', vehicleBrandId: fiat.id },
      { name: 'Mobi', vehicleBrandId: fiat.id },
    ]);

    const ford = await VehicleBrand.create({ name: 'Ford' });

    const fordModels = await VehicleModel.bulkCreate([
      { name: 'EcoSport', vehicleBrandId: ford.id },
      { name: 'Fusion', vehicleBrandId: ford.id },
      { name: 'Focus', vehicleBrandId: ford.id },
      { name: 'Fiesta', vehicleBrandId: ford.id },
      { name: 'Ford Ka Hatch', vehicleBrandId: ford.id },
      { name: 'Ford Ka Sedan', vehicleBrandId: ford.id },
    ]);

    return res.json({
      ingested: {
        [fiat.name]: fiatModels,
        [ford.name]: fordModels,
      },
    });
  } catch (error) {
    console.error(error);
    return res.json({ error });
  }
});

// routes
app.use('/customers', isTokenValid, require('./routes/customer.routes'));
app.use('/vehicles', isTokenValid, require('./routes/vehicle.routes'));
app.use('/repairs', isTokenValid, require('./routes/repair.routes'));

app.use('/auth', require('./routes/auth.routes'));
// app.use('/users', require('./routes/user.routes'));

app.listen(config.port, config.hostname, () => {
  console.log(`server running on port ${config.port}`);
});
