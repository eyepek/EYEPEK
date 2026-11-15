import mysql from 'mysql2/promise';
let pool;
export function getDb() {
 if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
 if (!pool) pool=mysql.createPool({uri:process.env.DATABASE_URL,waitForConnections:true,connectionLimit:5,queueLimit:0,ssl:process.env.DB_SSL==='true'?{rejectUnauthorized:true}:undefined});
 return pool;
}