const express=require('express');
const bcrypt=require('bcryptjs')
const jsonwebtoken= require('jsonwebtoken')

const userModel=require('../models/user-model');
const verifyToken=require('../verifytoken');
const router= express.Router();


//register endpoint
router.post("/register",(req,res)=>{
    let user=req.body;
    console.log(user)
    bcrypt.genSalt(10,(err,salt)=>{
        if(err==null){
            bcrypt.hash(user.password,salt,(err,newpassword)=>{
                user.password=newpassword;
                let userobj=new userModel(user);
                userobj.save()
                .then(()=>{
                    res.status(201).send({message:"User Registered",success:true})
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(500).send({message:"problem in registering user",success:false})
                })
            })
        }
    })  
 })

 router.post("/login",(req,res)=>{
    let usercred=req.body;
    userModel.findOne({username:usercred.username})
    .then((user)=>{
        if(user!=null){
            bcrypt.compare(usercred.password,user.password,(err,status)=>{
                if(status==true){
                    jsonwebtoken.sign(usercred,"secretkey",(err,token)=>{
                        if(err==null){
                            res.send({message:"welcome user",token:token})
                        }
                    })
                    res.status(401).send({message:"password do not match"})
                }
                else{
                    res.status(404).send({message:"User not found"})
                }
            })
        }
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problems"})
    })
})

module.exports=router;