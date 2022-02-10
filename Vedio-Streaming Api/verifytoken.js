const jsonwebtoken=require('jsonwebtoken')

//custom middlewarefunction for token verification
function verifyToken(req,res,next){
    if(req.headers.authorization!=undefined){
        let token=req.headers.authorization.split(" ")[1];

        jsonwebtoken.verify(token,"secretkey",(err,userCred)=>{
            if(err==null){
                next();
            }
            else{
                res.status(401).send({message:"Invalid token"})
            }
        })
    }
}

module.exports=verifyToken