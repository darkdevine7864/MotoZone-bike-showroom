import {Router} from 'express';
import {Booking,Bike} from '../models.js';
import {protect,adminOnly} from '../middleware.js';
const r=Router();
r.post('/',protect,async(req,res)=>{try{
 const {bikeId,date,phone,notes=''}=req.body;
 if(!bikeId||!date||!phone?.trim())return res.status(400).json({message:'Bike, date and phone are required.'});
 const d=new Date(date);if(Number.isNaN(d.getTime())||d<new Date())return res.status(400).json({message:'Choose a future date and time.'});
 if(!await Bike.findById(bikeId))return res.status(404).json({message:'Bike not found.'});
 const b=await Booking.create({user:req.user._id,bike:bikeId,date:d,phone:phone.trim(),notes});await b.populate('bike','name brand');res.status(201).json({message:'Test-ride request sent.',booking:b});
 }catch(e){res.status(400).json({message:e.message});}});
r.get('/mine',protect,async(req,res)=>{try{res.json(await Booking.find({user:req.user._id}).populate('bike','name brand price').sort({date:1}));}catch(e){res.status(500).json({message:e.message});}});
r.get('/',protect,adminOnly,async(_req,res)=>{try{res.json(await Booking.find().populate('user','name email').populate('bike','name brand').sort({createdAt:-1}));}catch(e){res.status(500).json({message:e.message});}});
r.patch('/:id/status',protect,adminOnly,async(req,res)=>{try{if(!['Pending','Approved','Completed','Cancelled'].includes(req.body.status))return res.status(400).json({message:'Invalid status'});const b=await Booking.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});if(!b)return res.status(404).json({message:'Booking not found'});res.json(b);}catch(e){res.status(400).json({message:e.message});}});
export default r;
