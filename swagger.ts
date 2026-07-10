import swaggerAutoGenFactory from 'swagger-autogen';

const swaggerAutoGen = swaggerAutoGenFactory();

const outputFile = './swagger_output.json';

const routes = ['./src/routes/index.ts'];

swaggerAutoGen(outputFile, routes);
