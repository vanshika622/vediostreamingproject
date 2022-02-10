const mongoose= require('mongoose');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
     username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{timestamps:true});

const userModel= new mongoose.model('users',userSchema)

module.exports=userModel;