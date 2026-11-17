import { getDb } from '../../_lib/db.js';
import { requireUser } from '../../_lib/auth.js';
const json=(res,status,body)=>res.status(status).json(body);
export default async function handler(req,res){
 if(req.method!=='GET'){res.setHeader('Allow','GET');return json(res,405,{error:'Method not allowed'});}
 const auth=requireUser(req,res);if(!auth)return;
 if(auth.role!=='student'&&auth.role!=='admin')return json(res,403,{error:'Student access required'});
 try{
  const [rows]=await getDb().execute(`SELECT a.id AS assignmentId,a.assigned_at AS assignedAt,
   u.full_name AS fullName,td.tutor_code AS tutorId,tp.headline,tp.bio,
   td.qualification,td.experience_years AS experienceYears,td.subjects,td.languages,td.teaching_mode AS teachingMode
   FROM learning_student_tutor_assignments a
   JOIN learning_users u ON u.id=a.tutor_id
   JOIN learning_tutor_profiles tp ON tp.user_id=u.id
   LEFT JOIN learning_tutor_details td ON td.user_id=u.id
   WHERE a.student_id=? AND a.status='active' AND u.status='active' AND tp.approval_status='approved'
   ORDER BY a.assigned_at DESC`,[auth.id]);
  return json(res,200,{ok:true,tutors:rows});
 }catch(error){
  console.error('Assigned tutor lookup failed:',error?.code||'unknown');
  if(error?.code==='ER_NO_SUCH_TABLE')return json(res,503,{error:'Tutor allocation setup is pending'});
  return json(res,500,{error:'Assigned tutors could not be loaded'});
 }
}
