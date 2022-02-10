//inbuilt
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')


// const { JsonWebTokenError } = require('jsonwebtoken')
const userrouter= require('./Controllers/user');
const vediorouter=require('./Controllers/vedio')



mongoose.connect("mongodb://localhost:27017/vedio-stream-db")
.then(()=>{console.log("connection to mongo done")})
.catch(()=>{console.log("some problem")})

const app=express();

app.use(cors());
app.use(express.json());

app.use("/user",userrouter);
app.use("/vedio",vediorouter);



app.listen(8000)