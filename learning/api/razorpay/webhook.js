import crypto from 'node:crypto';
import {getDb} from '../_lib/db.js';
export const config={api:{bodyParser:false}};
async function rawBody(req){const chunks=[];for await(const x of req)chunks.push(Buffer.isBuffer(x)?x:Buffer.from(x));return Buffer.concat(chunks);}
function equalHex(a,b){if(!/^[a-f0-9]{64}$/i.test(a||'')||!/^[a-f0-9]{64}$/i.test(b||''))return false;return crypto.timingSafeEqual(Buffer.from(a,'hex'),Buffer.from(b,'hex'));}
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).send('Method not allowed');
 const secret=process.env.RAZORPAY_WEBHOOK_SECRET;if(!secret)return res.status(503).send('Webhook is not configured');
 let raw;try{raw=await rawBody(req);}catch{return res.status(400).send('Invalid body');}
 const signature=req.headers['x-razorpay-signature']||'',expected=crypto.createHmac('sha256',secret).update(raw).digest('hex');
 if(!equalHex(signature,expected))return res.status(400).send('Invalid webhook signature');
 let event;try{event=JSON.parse(raw.toString('utf8'));}catch{return res.status(400).send('Invalid JSON');}
 if(event.event!=='qr_code.credited')return res.status(200).json({received:true,ignored:event.event||'unknown'});
 const payment=event.payload?.payment?.entity,qr=event.payload?.qr_code?.entity,eventId=req.headers['x-razorpay-event-id']||null;
 if(!payment?.id||!qr?.id||payment.status!=='captured')return res.status(400).send('Incomplete payment event');
 let c;
 try{
  c=await getDb().getConnection();await c.beginTransaction();
  if(eventId){const [seen]=await c.execute('SELECT id FROM learning_payment_events WHERE event_id=? LIMIT 1',[eventId]);if(seen.length){await c.commit();return res.status(200).json({received:true,duplicate:true});}}
  const [rows]=await c.execute("SELECT p.id payment_row_id,p.booking_id,p.amount_paise,p.status payment_status,b.amount_paise booking_amount,b.currency,b.status booking_status FROM learning_payments p JOIN learning_bookings b ON b.id=p.booking_id WHERE p.razorpay_qr_id=? FOR UPDATE",[qr.id]);
  const r=rows[0];if(!r){await c.rollback();return res.status(200).json({received:true,ignored:'unknown_qr'});}
  if(Number(payment.amount)!==Number(r.amount_paise)||Number(r.booking_amount)!==Number(payment.amount)||payment.currency!=='INR'||Number(r.amount_paise)!==Number(r.booking_amount)){
   await c.execute("UPDATE learning_payments SET status='amount_mismatch' WHERE id=?",[r.payment_row_id]);await c.commit();return res.status(200).json({received:true,flagged:'amount_mismatch'});
  }
  if(r.payment_status!=='paid'){
   await c.execute("UPDATE learning_payments SET status='paid',razorpay_payment_id=?,paid_at=CURRENT_TIMESTAMP WHERE id=?",[payment.id,r.payment_row_id]);
   await c.execute("UPDATE learning_bookings SET status='confirmed',paid_at=CURRENT_TIMESTAMP WHERE id=? AND status='pending_payment'",[r.booking_id]);
  }
  if(eventId)await c.execute('INSERT INTO learning_payment_events(event_id,event_type) VALUES(?,?)',[eventId,event.event]);
  await c.commit();return res.status(200).json({received:true});
 }catch(e){if(c)await c.rollback();console.error('Webhook processing failed:',e.message);return res.status(500).send('Webhook processing failed');}
 finally{c?.release();}
}