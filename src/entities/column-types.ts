export const DATETIME_COLUMN_TYPE =
  process.env.DB_DIALECT === 'better-sqlite3' ? 'datetime' : 'timestamp';
