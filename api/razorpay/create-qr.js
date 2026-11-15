import {getDb} from '../_lib/db.js';
import {requireUser} from '../_lib/auth.js';
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const user=requireUser(req,res);if(!user)return;
 const bookingId=Number(req.body?.bookingId);if(!Number.isSafeInteger(bookingId)||bookingId<1)return res.status(400).json({error:'Valid bookingId is required'});
 const keyId=process.env.RAZORPAY_KEY_ID,keySecret=process.env.RAZORPAY_KEY_SECRET;
 if(!keyId||!keySecret)return res.status(503).json({error:'Razorpay is not configured yet'});
 let c;
 try{
  c=await getDb().getConnection();
  const [rows]=await c.execute("SELECT id,student_id,amount_paise,currency,status FROM learning_bookings WHERE id=? LIMIT 1",[bookingId]);
  const b=rows[0];if(!b||Number(b.student_id)!==user.id)return res.status(404).json({error:'Booking not found'});
  if(b.status!=='pending_payment')return res.status(409).json({error:'Booking is not awaiting payment'});
  const amount=Number(b.amount_paise);if(!Number.isSafeInteger(amount)||amount<100||b.currency!=='INR')return res.status(400).json({error:'Booking amount is invalid'});
  const [old]=await c.execute("SELECT razorpay_qr_id,image_url,expires_at FROM learning_payments WHERE booking_id=? AND status='created' ORDER BY id DESC LIMIT 1",[bookingId]);
  if(old[0]&&new Date(old[0].expires_at).getTime()>Date.now())return res.status(200).json({qrCodeId:old[0].razorpay_qr_id,imageUrl:old[0].image_url,expiresAt:old[0].expires_at,reused:true});
  const closeBy=Math.floor(Date.now()/1000)+3600;
  const rr=await fetch('https://api.razorpay.com/v1/payments/qr_codes',{method:'POST',headers:{Authorization:'Basic '+Buffer.from(keyId+':'+keySecret).toString('base64'),'Content-Type':'application/json'},body:JSON.stringify({type:'upi_qr',name:'EYEPEK Booking '+bookingId,usage:'single_use',fixed_amount:true,payment_amount:amount,description:'EYEPEK tutoring booking #'+bookingId,close_by:closeBy,notes:{booking_id:String(bookingId),student_id:String(user.id)}})});
  const qr=await rr.json();if(!rr.ok){console.error('Razorpay QR create failed',rr.status,qr?.error?.code);return res.status(502).json({error:'Unable to create payment QR'});}
  await c.execute("INSERT INTO learning_payments(booking_id,student_id,razorpay_qr_id,image_url,amount_paise,currency,status,expires_at) VALUES(?,?,?,?,?,'INR','created',FROM_UNIXTIME(?))",[bookingId,user.id,qr.id,qr.image_url,amount,closeBy]);
  return res.status(201).json({qrCodeId:qr.id,imageUrl:qr.image_url,amountPaise:amount,currency:'INR',expiresAt:new Date(closeBy*1000).toISOString()});
 }catch(e){console.error('QR create error:',e.message);return res.status(500).json({error:'Payment service temporarily unavailable'});}
 finally{c?.release();}
}