const swaggerAutoGen = require('swagger-autogen')();

const outputFile = './swagger_output.json';

const routes = [
  './src/routes/index.js',
];

swaggerAutoGen(outputFile, routes);
