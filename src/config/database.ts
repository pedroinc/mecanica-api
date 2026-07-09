import { Options } from 'sequelize';

const dbConfig: Options = {
  dialect: process.env.DB_DIALECT as Options['dialect'],
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
  },
};

export default dbConfig;
