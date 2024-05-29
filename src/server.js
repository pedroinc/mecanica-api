require('dotenv').config();

const express = require('express');
const cors = require('cors')
require('./database/index');
const app = express();
const isTokenValid = require('./middlewares/isTokenValid');

const config = {
  hostname: process.env.HOST,
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

// routes
app.use('/customers', isTokenValid, require('./routes/customer.routes'));
app.use('/vehicles', isTokenValid, require('./routes/vehicle.routes'));
app.use('/repairs', isTokenValid, require('./routes/repair.routes'));

app.use('/auth', require('./routes/auth.routes'));
// app.use('/users', require('./routes/user.routes'));

app.listen(config.port, config.hostname, () => {
  console.log(`server running on port ${config.port}`);
});
