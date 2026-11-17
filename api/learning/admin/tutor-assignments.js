import { getDb } from '../../_lib/db.js';
import { requireUser } from '../../_lib/auth.js';

const json=(res,status,body)=>res.status(status).json(body);
export default async function handler(req,res){
 const auth=requireUser(req,res); if(!auth)return;
 try{
  const db=getDb();
  const [admins]=await db.execute("SELECT id FROM learning_users WHERE id=? AND role='admin' AND status='active' LIMIT 1",[auth.id]);
  if(!admins.length)return json(res,403,{error:'Administrator access required'});
  if(req.method==='GET'){
   const [students]=await db.execute("SELECT id,full_name AS fullName,email FROM learning_users WHERE role='student' AND status='active' ORDER BY full_name LIMIT 1000");
   const [tutors]=await db.execute(`SELECT u.id,u.full_name AS fullName,td.tutor_code AS tutorId,td.subjects
    FROM learning_users u JOIN learning_tutor_profiles tp ON tp.user_id=u.id
    JOIN learning_tutor_details td ON td.user_id=u.id
    WHERE u.role='tutor' AND u.status='active' AND tp.approval_status='approved'
    ORDER BY u.full_name LIMIT 1000`);
   const [assignments]=await db.execute(`SELECT a.id,a.student_id AS studentId,s.full_name AS studentName,
    a.tutor_id AS tutorId,u.full_name AS tutorName,td.tutor_code AS tutorCode,
    a.status,a.admin_note AS adminNote,a.assigned_at AS assignedAt
    FROM learning_student_tutor_assignments a
    JOIN learning_users s ON s.id=a.student_id JOIN learning_users u ON u.id=a.tutor_id
    LEFT JOIN learning_tutor_details td ON td.user_id=u.id
    ORDER BY a.assigned_at DESC LIMIT 1000`);
   return json(res,200,{ok:true,students,tutors,assignments});
  }
  if(req.method==='POST'){
   const studentId=Number(req.body?.studentId),tutorId=Number(req.body?.tutorId);
   const note=String(req.body?.adminNote||'').trim().slice(0,1000)||null;
   if(!Number.isSafeInteger(studentId)||studentId<1||!Number.isSafeInteger(tutorId)||tutorId<1||studentId===tutorId)return json(res,400,{error:'Select a valid student and tutor'});
   const [students]=await db.execute("SELECT id FROM learning_users WHERE id=? AND role='student' AND status='active' LIMIT 1",[studentId]);
   const [tutors]=await db.execute("SELECT u.id FROM learning_users u JOIN learning_tutor_profiles tp ON tp.user_id=u.id WHERE u.id=? AND u.role='tutor' AND u.status='active' AND tp.approval_status='approved' LIMIT 1",[tutorId]);
   if(!students.length)return json(res,404,{error:'Active student not found'});
   if(!tutors.length)return json(res,409,{error:'Tutor must be active and Admin-approved before allocation'});
   const [existing]=await db.execute("SELECT id FROM learning_student_tutor_assignments WHERE student_id=? AND tutor_id=? AND status='active' LIMIT 1",[studentId,tutorId]);
   if(existing.length)return json(res,409,{error:'This Tutor is already assigned to this Student'});
   const [result]=await db.execute("INSERT INTO learning_student_tutor_assignments(student_id,tutor_id,assigned_by,admin_note) VALUES(?,?,?,?)",[studentId,tutorId,auth.id,note]);
   return json(res,201,{ok:true,id:result.insertId,message:'Tutor assigned by EYEPEK Admin'});
  }
  if(req.method==='PATCH'){
   const id=Number(req.body?.id);
   if(!Number.isSafeInteger(id)||id<1)return json(res,400,{error:'Valid assignment ID required'});
   const [result]=await db.execute("UPDATE learning_student_tutor_assignments SET status='ended',ended_at=NOW() WHERE id=? AND status='active'",[id]);
   if(!result.affectedRows)return json(res,404,{error:'Active allocation not found'});
   return json(res,200,{ok:true,message:'Tutor allocation ended'});
  }
  res.setHeader('Allow','GET, POST, PATCH');return json(res,405,{error:'Method not allowed'});
 }catch(error){
  console.error('Admin tutor allocation failed:',error?.code||'unknown');
  if(error?.code==='ER_NO_SUCH_TABLE')return json(res,503,{error:'Run the tutor allocation database migration first'});
  return json(res,500,{error:'Tutor allocation could not be completed'});
 }
}
