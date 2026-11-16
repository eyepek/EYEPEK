import { getDb } from '../_lib/db.js';
import { requireUser } from '../_lib/auth.js';

export default async function handler(req,res) {
  if (req.method !== 'GET') { res.setHeader('Allow','GET'); return res.status(405).json({error:'Method not allowed'}); }
  const auth = requireUser(req,res);
  if (!auth) return;
  try {
    const [rows] = await getDb().execute('SELECT id,full_name,email,role,status,created_at FROM learning_users WHERE id=? LIMIT 1',[auth.id]);
    if (!rows.length) return res.status(404).json({error:'Account not found'});
    const u = rows[0];
    return res.status(200).json({ok:true,user:{id:u.id,fullName:u.full_name,email:u.email,role:u.role,status:u.status,createdAt:u.created_at}});
  } catch (error) {
    console.error('Learning profile read failed:',error?.code || 'unknown');
    return res.status(500).json({error:'Could not load account'});
  }
}
