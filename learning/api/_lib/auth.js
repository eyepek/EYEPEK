import jwt from 'jsonwebtoken';
export function requireUser(req,res) {
 const h=req.headers.authorization||'', token=h.startsWith('Bearer ')?h.slice(7):'';
 if(!token||!process.env.JWT_SECRET){res.status(401).json({error:'Authentication required'});return null;}
 try {const p=jwt.verify(token,process.env.JWT_SECRET,{algorithms:['HS256']});const id=Number(p.sub||p.userId);if(!Number.isSafeInteger(id)||id<1)throw Error();return{id,role:p.role};}
 catch {res.status(401).json({error:'Invalid or expired session'});return null;}
}