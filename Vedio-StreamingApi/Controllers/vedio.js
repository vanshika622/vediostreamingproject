const express=require('express');

const vedioModel=require('../models/vedio-model');
const verifyToken=require('../verifytoken');
const fs=require('fs')
const router= express.Router();

router.get("/getvedios",verifyToken,async (req,res)=>{
    // console.log(await vedioModel.find())
    let vedios= await vedioModel.find();

    res.send(vedios);

})
//to get vedios based on ig
router.get("/vedios/:id",async (req,res)=>{
 let id=req.params.id
 let vedio=await vedioModel.findOne({_id:id})
})
//end ponit to store veio info
router.get("/:user_id/:vedio_id",(req,res)=>{
    let userVedio={};
    userVedio.user=req.params.user_id;
    userVedio.vedio=req.params.vedio_id
    let uservedioObj= new uservedioModel(userVedio);
    uservedioObj.save()
    .then(()=>{
        res.send({message:"Vedio can be played"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem getting the vedio info"})
    })
})
router.get("/stream/:vedio_id/", async(req,res)=>{
    const range=req.headers.range
 if(!range){
     res.status(400).send({message:"Range header is required"})
 }
 
  let id= req.params.vedio_id;
  let vedio =await vedioModel.findOne({_id:vedio_id});
 //  vedio.vedioPath

 //vedio size
 const vedioSize = fs.statSync(vedio.vedioPath).size;
 //starting ponit to play the vedio
 const start= Number(range.replace(/\D/g,""));

 // end bute of chunks
 const end= Math.min(start+10**6,vedioSize-1);

 const Contentlength=end-start+1

 let header={
     "Content-Range":`bytes ${start}-${end}/${vedioSize}`,
     "Accept-Range":"bytes",
     "Content-Length":Contentlength,
     "Content-Type":"vedio/mp4"
 }
 res.writeHead(206,headers)

 let readvediostream= fs.createReadStream(vedio.vediopath,{start,end})

 readvediostream.pipe(res)

})

module.exports=router;