import 'dotenv/config';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json';

import express from 'express';
import cors from 'cors';
import './src/database/index';

import appRouter from './src/routes';
import cookieParser from 'cookie-parser';

const app = express();

const config = {
  hostname: process.env.HOST || 'localhost',
  port: process.env.PORT ? Number.parseInt(process.env.PORT) : 4000,
  allowedOrigin: process.env.FRONT_URL || 'http://localhost:3000',
};

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: config.allowedOrigin,
  }),
);

app.use((req, res, next) => {
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
