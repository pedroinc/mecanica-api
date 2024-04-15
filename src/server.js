require('dotenv').config();

const express = require('express');
const connection = require('./database/index');
const app = express();
const isTokenValid = require('./middlewares/isTokenValid');
const VBrand = require('./models/VBrand');
const VModel = require('./models/VModel');

const config = {
  hostname: '0.0.0.0',
  port: process.env.PORT,
};

app.use(express.json());

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
  // ingest vbrands
  try {
    const vbrand = await VBrand.create({ name: 'Fiat' });

    const vmodel = await VModel.bulkCreate([
      { name: 'Palio', vbrand_id: vbrand.id },
      { name: 'Siena', vbrand_id: vbrand.id },
      { name: 'Uno', vbrand_id: vbrand.id },
      { name: 'Stilo', vbrand_id: vbrand.id },
      { name: 'Mobi', vbrand_id: vbrand.id },
    ]);

    return res.json({
      ingested: {
        vbrand,
        vmodel,
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

app.use('/users', require('./routes/user.routes'));

app.listen(config.port, config.hostname, () => {
  console.log(`server running on port ${config.port}`);
});
