import {getDb} from '../../_lib/db.js';
import {requireUser} from '../../_lib/auth.js';
const json=(res,status,body)=>res.status(status).json(body);
export default async function handler(req,res){
 const auth=requireUser(req,res);if(!auth)return;
 const db=getDb();
 try{
  const [admins]=await db.execute("SELECT id FROM learning_users WHERE id=? AND role='admin' AND status='active' LIMIT 1",[auth.id]);
  if(!admins.length)return json(res,403,{error:'Administrator access required'});
  if(req.method==='GET'){
   const month=String(req.query?.month||new Date().toISOString().slice(0,7));
   if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month))return json(res,400,{error:'Month must use YYYY-MM'});
   const [rows]=await db.execute(`SELECT e.id,e.tutor_id AS tutorId,u.full_name AS tutorName,td.tutor_code AS tutorCode,
    e.earning_type AS earningType,e.source_id AS sourceId,e.period_month AS periodMonth,e.amount_paise AS amountPaise,
    e.status,e.admin_note AS adminNote,e.approved_at AS approvedAt,e.paid_at AS paidAt
    FROM learning_tutor_earning_ledger e JOIN learning_users u ON u.id=e.tutor_id
    LEFT JOIN learning_tutor_details td ON td.user_id=e.tutor_id WHERE e.period_month=? ORDER BY u.full_name,e.created_at DESC`,[month]);
   return json(res,200,{ok:true,rows});
  }
  if(req.method==='POST'){
   const tutorId=Number(req.body?.tutorId),sourceId=Number(req.body?.sourceId),type=String(req.body?.earningType||''),action=String(req.body?.action||'record');
   if(!Number.isSafeInteger(tutorId)||tutorId<1||!Number.isSafeInteger(sourceId)||sourceId<1||!['live_session','assignment'].includes(type))return json(res,400,{error:'Valid tutor, source record and earning type are required'});
   if(action==='record'){
    let amount=0,month='';
    if(type==='live_session'){
     const [rows]=await db.execute(`SELECT s.id,s.status,s.started_at,s.ended_at,b.tutor_id
      FROM learning_sessions s JOIN learning_bookings b ON b.id=s.booking_id
      WHERE s.id=? AND b.tutor_id=? LIMIT 1`,[sourceId,tutorId]);
     if(!rows.length||rows[0].status!=='finished'||!rows[0].started_at||!rows[0].ended_at)return json(res,409,{error:'Only finished sessions with recorded start and end times can be added'});
     const [rate]=await db.execute("SELECT setting_value FROM learning_platform_settings WHERE setting_key='tutor_session_compensation' LIMIT 1");
     amount=Math.round(Number(rate[0]?.setting_value||0)*100);month=new Date(rows[0].started_at).toISOString().slice(0,7);
    }else{
     const [rows]=await db.execute("SELECT id,tutor_id,created_at FROM learning_assignments WHERE id=? AND tutor_id=? LIMIT 1",[sourceId,tutorId]);
     if(!rows.length)return json(res,404,{error:'Assignment not found for this tutor'});
     const [rate]=await db.execute("SELECT setting_value FROM learning_platform_settings WHERE setting_key='tutor_assignment_compensation' LIMIT 1");
     amount=Math.round(Number(rate[0]?.setting_value||0)*100);month=new Date(rows[0].created_at).toISOString().slice(0,7);
    }
    if(!amount)return json(res,409,{error:'Admin must set a non-zero compensation rate before recording earnings'});
    await db.execute(`INSERT INTO learning_tutor_earning_ledger(tutor_id,earning_type,source_id,period_month,amount_paise,status)
      VALUES(?,?,?,?,?,'pending_review') ON DUPLICATE KEY UPDATE amount_paise=VALUES(amount_paise),period_month=VALUES(period_month)`,[tutorId,type,sourceId,month,amount]);
    return json(res,201,{ok:true,message:'Earning recorded for Admin review'});
   }
   const entryId=Number(req.body?.entryId),status=String(req.body?.status||'');
   if(!Number.isSafeInteger(entryId)||entryId<1||!['approved','rejected','paid'].includes(status))return json(res,400,{error:'Valid earning entry and status required'});
   if(status==='paid'){
    const [pending]=await db.execute("SELECT id FROM learning_tutor_earning_ledger WHERE id=? AND status='approved' LIMIT 1",[entryId]);
    if(!pending.length)return json(res,409,{error:'Only Admin-approved earnings can be marked paid'});
    await db.execute("UPDATE learning_tutor_earning_ledger SET status='paid',paid_at=CURRENT_TIMESTAMP,approved_by=? WHERE id=?",[auth.id,entryId]);
   }else{
    await db.execute("UPDATE learning_tutor_earning_ledger SET status=?,approved_by=?,approved_at=IF(?='approved',CURRENT_TIMESTAMP,approved_at) WHERE id=?",[status,auth.id,status,entryId]);
   }
   return json(res,200,{ok:true,message:'Tutor earning status updated'});
  }
  res.setHeader('Allow','GET, POST');return json(res,405,{error:'Method not allowed'});
 }catch(e){console.error('Admin tutor earnings failed:',e?.code||'unknown');return json(res,500,{error:'Could not process tutor earnings'});}
}