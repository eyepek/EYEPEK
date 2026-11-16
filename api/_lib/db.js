import mysql from 'mysql2/promise';

let pool;

export function getDb() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error('DATABASE_URL is not configured');

  if (!pool) {
    const u = new URL(uri);
    const database = decodeURIComponent(u.pathname.replace(/^\//, ''));

    pool = mysql.createPool({
      host: u.hostname,
      port: Number(u.port || 3306),
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database,
      waitForConnections: true,
      connectionLimit: 2,
      queueLimit: 0,
      // Enzonic requires TLS for every MySQL connection.
      ssl: process.env.DB_SSL === 'true' ? {} : undefined
    });
  }

  return pool;
}
