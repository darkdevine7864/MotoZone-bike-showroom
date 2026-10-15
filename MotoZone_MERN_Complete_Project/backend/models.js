import mongoose from 'mongoose';
export const User = mongoose.model('User', new mongoose.Schema({
 name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true},
 passwordHash:{type:String,required:true}, role:{type:String,enum:['user','admin'],default:'user'}
},{timestamps:true}));
export const Bike = mongoose.model('Bike', new mongoose.Schema({
 name:{type:String,required:true},brand:{type:String,required:true},price:{type:Number,min:0,required:true},
 engineCC:{type:Number,min:0,required:true},imageUrl:{type:String,default:''},description:{type:String,default:''}
},{timestamps:true}));
export const Booking = mongoose.model('Booking', new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
 bike:{type:mongoose.Schema.Types.ObjectId,ref:'Bike',required:true},date:{type:Date,required:true},
 phone:{type:String,required:true},notes:{type:String,default:''},
 status:{type:String,enum:['Pending','Approved','Completed','Cancelled'],default:'Pending'}
},{timestamps:true}));
