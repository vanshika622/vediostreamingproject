const mongoose=require('mongoose')

const uservVedioSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    vedio:{type:mongoose.Schema.Types.ObjectId,ref:"vediodb"},
    watched:{type:Number,default:0},
    status:{type:String,enum:["playing","finished"],default:"playing"}
},{timestamps:true})

const uservVedioModel= new mongoose.Schema('user-vedio',uservVedioSchema)

module.exports=uservVedioModel