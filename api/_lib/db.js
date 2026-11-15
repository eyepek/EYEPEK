import mysql from 'mysql2/promise';
let pool;
export function getDb() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error('DATABASE_URL is not configured');
  if (!pool) {
    const u = new URL(uri);
    pool = mysql.createPool({
      host: u.hostname,
      port: Number(u.port || 3306),
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: u.pathname.replace(/^\\//, ''),
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined
    });
  }
  return pool;
}