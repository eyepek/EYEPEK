import { getDb } from '../_lib/db.js';
import { promisify } from 'node:util';
import { scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import jwt from 'jsonwebtoken';

const scrypt = promisify(scryptCallback);
const json = (res,status,body) => res.status(status).json(body);

export default async function handler(req,res) {
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return json(res,405,{error:'Method not allowed'}); }
  if (!process.env.JWT_SECRET) return json(res,503,{error:'Authentication is not configured'});
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = req.body?.password;
    const adminOnly = req.body?.adminOnly === true;
    if (!email || typeof password !== 'string') return json(res,400,{error:'Email and password are required'});
    const [rows] = await getDb().execute('SELECT id,full_name,email,password_hash,role,status FROM learning_users WHERE email=? LIMIT 1',[email]);
    if (!rows.length) return json(res,401,{error:'Invalid email or password'});
    const user = rows[0];
    const [salt,storedHex] = String(user.password_hash).split(':');
    if (!salt || !storedHex) return json(res,401,{error:'Invalid email or password'});
    const derived = Buffer.from(await scrypt(password,salt,64));
    const stored = Buffer.from(storedHex,'hex');
    if (stored.length !== derived.length || !timingSafeEqual(stored,derived)) return json(res,401,{error:'Invalid email or password'});
    if (user.status !== 'active') return json(res,403,{error:'Your account is awaiting approval or is suspended'});
    if (adminOnly && user.role !== 'admin') return json(res,403,{error:'Administrator access required'});
    if (!adminOnly && user.role === 'admin') return json(res,403,{error:'Use the private administrator sign-in page'});
    const token = jwt.sign({sub:String(user.id),role:user.role},process.env.JWT_SECRET,{algorithm:'HS256',expiresIn:'7d'});
    return json(res,200,{ok:true,token,user:{id:user.id,fullName:user.full_name,email:user.email,role:user.role,status:user.status}});
  } catch (error) {
    console.error('Learning login failed:',error?.code || 'unknown');
    if (error?.code === 'ER_NO_SUCH_TABLE') return json(res,503,{error:'Database tables are not installed yet'});
    return json(res,500,{error:'Login could not be completed'});
  }
}
