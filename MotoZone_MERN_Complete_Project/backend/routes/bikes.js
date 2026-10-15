import {Router} from 'express';
import {Bike} from '../models.js';
import {protect,adminOnly} from '../middleware.js';
const r=Router();
r.get('/',async(req,res)=>{try{const s=req.query.search||'';const filter=s?{$or:[{name:{$regex:s,$options:'i'}},{brand:{$regex:s,$options:'i'}}]}:{};res.json(await Bike.find(filter).sort({createdAt:-1}));}catch(e){res.status(500).json({message:e.message});}});
r.post('/',protect,adminOnly,async(req,res)=>{try{res.status(201).json(await Bike.create(req.body));}catch(e){res.status(400).json({message:e.message});}});
r.put('/:id',protect,adminOnly,async(req,res)=>{try{const b=await Bike.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!b)return res.status(404).json({message:'Bike not found'});res.json(b);}catch(e){res.status(400).json({message:e.message});}});
r.delete('/:id',protect,adminOnly,async(req,res)=>{try{const b=await Bike.findByIdAndDelete(req.params.id);if(!b)return res.status(404).json({message:'Bike not found'});res.json({message:'Deleted'});}catch(e){res.status(500).json({message:e.message});}});
export default r;
