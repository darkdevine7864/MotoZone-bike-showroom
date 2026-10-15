import jwt from 'jsonwebtoken';
import {User} from './models.js';
export async function protect(req,res,next){
 try{
  const h=req.headers.authorization||''; if(!h.startsWith('Bearer ')) return res.status(401).json({message:'Please log in first.'});
  const payload=jwt.verify(h.slice(7),process.env.JWT_SECRET);
  req.user=await User.findById(payload.id).select('-passwordHash');
  if(!req.user) return res.status(401).json({message:'Account not found.'});
  next();
 }catch{return res.status(401).json({message:'Login expired. Please log in again.'});}
}
export function adminOnly(req,res,next){if(req.user?.role!=='admin')return res.status(403).json({message:'Admin access required.'});next();}
