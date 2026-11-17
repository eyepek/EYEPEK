import { getDb } from '../_lib/db.js';
import { requireUser } from '../_lib/auth.js';

const json=(res,status,body)=>res.status(status).json(body);
export default async function handler(req,res){
  if(req.method!=='GET'){res.setHeader('Allow','GET');return json(res,405,{error:'Method not allowed'});}
  const auth=requireUser(req,res); if(!auth)return;
  if(auth.role!=='student'&&auth.role!=='admin')return json(res,403,{error:'Student access required'});
  try{
    const code=String(req.query?.tutorId||'').trim().toUpperCase().slice(0,32);
    const subject=String(req.query?.subject||'').trim().slice(0,100);
    const name=String(req.query?.name||'').trim().slice(0,100);
    const where=["u.role='tutor'","u.status='active'","tp.approval_status='approved'"];
    const values=[];
    if(code){where.push('UPPER(td.tutor_code)=?');values.push(code);}
    if(subject){where.push('(td.subjects LIKE ? OR tp.headline LIKE ?)');values.push('%'+subject+'%','%'+subject+'%');}
    if(name){where.push('(u.full_name LIKE ? OR tp.headline LIKE ?)');values.push('%'+name+'%','%'+name+'%');}
    const [rows]=await getDb().execute(
      `SELECT td.tutor_code AS tutorId,u.full_name AS fullName,tp.headline,tp.bio,
              td.qualification,td.experience_years AS experienceYears,td.subjects,td.languages,
              td.teaching_mode AS teachingMode,td.city
       FROM learning_users u
       JOIN learning_tutor_profiles tp ON tp.user_id=u.id
       JOIN learning_tutor_details td ON td.user_id=u.id
       WHERE ${where.join(' AND ')}
       ORDER BY u.full_name LIMIT 100`,values);
    return json(res,200,{ok:true,tutors:rows});
  }catch(error){
    console.error('Tutor directory lookup failed:',error?.code||'unknown');
    if(error?.code==='ER_NO_SUCH_TABLE')return json(res,503,{error:'Tutor directory setup is pending. Ask the administrator to complete the database migration.'});
    return json(res,500,{error:'Tutor search could not be completed'});
  }
}
