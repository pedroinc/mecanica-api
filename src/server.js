require('dotenv').config();

const express = require('express');
const sequelize = require('./database/index');
const app = express();
const isTokenValid = require('./middlewares/isTokenValid');

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
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
    return res.json({ message: 'All models were synchronized successfully.' });
  } catch (error) {
    const prefix = 'Unable to connect to the database!';
    console.error(prefix, error);
    return res.json({ error: prefix });
  }
});

// routes
app.use('/customers', isTokenValid, require('./routes/customer.routes'));

app.use('/users', require('./routes/user.routes'));

app.listen(config.port, config.hostname, () => {
  console.log(`server running on port ${config.port}`);
});
