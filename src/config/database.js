const sqliteConfig = {
  dialect: 'sqlite',
  storage: './mecanica.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    logging: process.env.DB_LOGGING ?? true,
  },
};

const anotherDbConfig = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    logging: process.env.DB_LOGGING ?? true,
  },
};

const dbConfig = process.env.DB_DIALECT === 'sqlite' ? sqliteConfig : anotherDbConfig;

module.exports = {
  ...dbConfig
};
