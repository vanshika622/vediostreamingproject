const express=require('express');
const bcryptjs=require('bcryptjs')
const jsonwebtoken= require('jsonwebtoken')

const userModel=require('../models/user-model');
const verifyToken=require('../verifytoken');
const router= express.Router();


//register endpoint
router.post("/register",(req,res)=>{
    let user=req.body;
    console.log(user)
    bcryptjs.genSalt(10,(err,salt)=>{
        if(err==null){
            bcryptjs.hash(user.password,salt,(err,newpassword)=>{
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

//  router.post("/login",(req,res)=>{
//     //  debugger;
//     let usercred=req.body;
//     // res.send(usercred)
//     userModel.findOne({username:usercred.username})
//     .then((user)=>{
       
//         if(user!=null){
//             bcryptjs.compare(usercred.password,user.password,(err,status)=>{
//                if(!err)
//                 if(status){
//                     jsonwebtoken.sign(usercred,"secretkey",(err,token)=>{
//                         if(err==null){
//                             // res.send(err);
//                             // res.send(user)
//                             res.send({message:"welcome user",token:token})
//                         }
//                     })
//                     res.status(401).send({message:"password do not match"})
//                 }
//                 else{
//                     res.status(404).send({message:"User not found"})
//                 }
//             })
//         }
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.send({message:"Some problems"})
//     })
// })
router.post("/login",(req,res)=>{
    let user_creds=req.body;

    userModel.findOne({username:user_creds.username})
    .then((user)=>{
           if(user!==null){
                 bcryptjs.compare(user_creds.password,user.password,(err,login)=>{
                     if(!err){
                         if(login){
                                   jsonwebtoken.sign(user_creds,"secretcode",(err,token)=>{
                                       if(err==null){
                                           res.send({ message:"Welcome User", token:token,user_id:user._id,success:true})
                                       }
                                   })
                         }
                         else{
                            res.send({message:"Incorrect password",success:false})
                         }
                     }
                 })
           }
           else{
               res.send({message:"Incorrect username",success:false})
           }
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:"Some Problem while login"})
    })

})

module.exports=router;