require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const express = require('express');
const cors = require('cors')
require('./src/database/index');
const app = express();

const appRouter = require('./src/routes');
const cookieParser = require('cookie-parser');

const config = {
  hostname: process.env.HOST || "localhost",
  port: process.env.PORT ? Number.parseInt(process.env.PORT) : 4000,
  allowedOrigin: process.env.FRONT_URL || "http://localhost:3000",
};

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  // allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
  // allowedHeaders: ["application/json"],
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  origin: config.allowedOrigin,
}));


// const corsOptions = {
//   AccessControlAllowOrigin: '*',
//   origin: 'https://abc.onrender.com',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
// }
// app.use(cors(corsOptions))

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', config.allowedOrigin);
  // res.header('Access-Control-Allow-Credentials', true);
  // res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  // res.setHeader("Access-Control-Allow-Origin", config.allowedOrigin);
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', async (req, res) => {
  try {
    return res.json({ message: 'Mecanica API - Home' });
  } catch (error) {
    return res.json({ error });
  }
});

app.use(appRouter);

app.listen(config.port, config.hostname, () => {
  console.log(`server running on port ${config.port}`);
});
