import { getDb } from '../_lib/db.js';
import { promisify } from 'node:util';
import { scrypt as scryptCallback, randomBytes, timingSafeEqual } from 'node:crypto';
import jwt from 'jsonwebtoken';

const scrypt = promisify(scryptCallback);
const json = (res, status, body) => res.status(status).json(body);

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return json(res,405,{error:'Method not allowed'}); }
  if (!process.env.JWT_SECRET) return json(res,503,{error:'Authentication is not configured'});
  try {
    const { fullName, email, password, role = 'student', institutionName } = req.body || {};
    const name = String(fullName || '').trim();
    const mail = String(email || '').trim().toLowerCase();
    if (name.length < 2 || name.length > 120) return json(res,400,{error:'Enter your full name'});
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) || mail.length > 190) return json(res,400,{error:'Enter a valid email'});
    if (typeof password !== 'string' || password.length < 8 || password.length > 128) return json(res,400,{error:'Password must be 8–128 characters'});
    if (!['student','tutor','institution'].includes(role)) return json(res,400,{error:'Invalid account type'});
    if (role === 'institution' && String(institutionName || '').trim().length < 2) return json(res,400,{error:'Enter institution name'});
    const db = getDb();
    const [existing] = await db.execute('SELECT id FROM learning_users WHERE email=? LIMIT 1',[mail]);
    if (existing.length) return json(res,409,{error:'An account with this email already exists'});
    const salt = randomBytes(16).toString('hex');
    const derived = await scrypt(password,salt,64);
    const passwordHash = salt + ':' + Buffer.from(derived).toString('hex');
    const [result] = await db.execute(
      'INSERT INTO learning_users(full_name,email,password_hash,role,status) VALUES(?,?,?,?,?)',
      [name,mail,passwordHash,role,role === 'student' ? 'active' : 'pending']
    );
    if (role === 'tutor') await db.execute('INSERT INTO learning_tutor_profiles(user_id) VALUES(?)',[result.insertId]);
    if (role === 'institution') await db.execute('INSERT INTO learning_institution_profiles(user_id,institution_name) VALUES(?,?)',[result.insertId,String(institutionName).trim()]);
    const token = jwt.sign({sub:String(result.insertId),role},process.env.JWT_SECRET,{algorithm:'HS256',expiresIn:'7d'});
    return json(res,201,{ok:true,token,user:{id:result.insertId,fullName:name,email:mail,role,status:role === 'student' ? 'active' : 'pending'}});
  } catch (error) {
    console.error('Learning registration failed:',error?.code || 'unknown');
    if (error?.code === 'ER_NO_SUCH_TABLE') return json(res,503,{error:'Database tables are not installed yet'});
    return json(res,500,{error:'Registration could not be completed'});
  }
}
