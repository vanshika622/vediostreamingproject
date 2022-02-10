const timespan = require('jsonwebtoken/lib/timespan')
const mongoose= require('mongoose')

const vedioSchema= new mongoose.Schema({
    name:{type:String,required:true},
    genre:{type:String,required:true},
    releaseDate:{type:Date,required:true},
    runTime:{type:Number,required:true},
    description:{type:String,required:true},
    actors:[{type:String}],
    rating:{type:Number,min:1,max:10},
    production:{type:String,required:true},
    directors:[{type:String}],
    vedioPath:{type:String,required:true}
},{timespan:true})

const vedioModel= new mongoose.model('vediodb',vedioSchema);

module.exports=vedioModel
// {
//     "name"="Some Some trailer",
//     "vedioPath":"./vedios/vediofile.mp4"
// }