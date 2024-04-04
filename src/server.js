const express = require('express');
const sequelize = require('./database/index');

const app = express();

app.use(express.json());

// routes
app.use('/clientes', require('./routes/customer.routes'));

const port = 3333;
// console.log(app);

app.listen(port, 'localhost', () => {
  console.log(`listening on port ${port}`);
});
