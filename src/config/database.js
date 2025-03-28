// const dbConfig = {
//   dialect: 'sqlite',
//   storage: './mecanica.sqlite',
//   define: {
//     timestamps: true,
//     underscored: true,
//   },
// };

const dbConfig = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    // logging: true,
  },
};

module.exports = dbConfig;
