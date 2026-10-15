import {Router} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models.js';
import {protect} from '../middleware.js';
const r=Router();
const token=u=>jwt.sign({id:u._id},process.env.JWT_SECRET,{expiresIn:'7d'});
const safe=u=>({id:u._id,name:u.name,email:u.email,role:u.role});
r.post('/register',async(req,res)=>{
 try{
  const {name,email,password}=req.body;
  if(!name?.trim()||!email?.trim()||!password)return res.status(400).json({message:'Name, email and password are required.'});
  if(password.length<8)return res.status(400).json({message:'Password must be at least 8 characters.'});
  const em=email.trim().toLowerCase(); if(await User.findOne({email:em}))return res.status(409).json({message:'Email already registered.'});
  const role=em===(process.env.ADMIN_EMAIL||'').trim().toLowerCase()?'admin':'user';
  const u=await User.create({name:name.trim(),email:em,passwordHash:await bcrypt.hash(password,12),role});
  res.status(201).json({token:token(u),user:safe(u)});
 }catch(e){res.status(500).json({message:e.message});}
});
r.post('/login',async(req,res)=>{
 try{const {email,password}=req.body;const u=await User.findOne({email:(email||'').trim().toLowerCase()});
 if(!u||!password||!(await bcrypt.compare(password,u.passwordHash)))return res.status(401).json({message:'Incorrect email or password.'});
 res.json({token:token(u),user:safe(u)});
 }catch(e){res.status(500).json({message:e.message});}
});
r.get('/me',protect,(req,res)=>res.json({user:safe(req.user)}));
export default r;
