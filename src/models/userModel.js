const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({

title:{
    type:String,
    required:"Title is required",
    enum:["Mr","Mrs","Miss"]
},
name:{
    type:String,
    required:"Name is required"
},
phone:{
    type:String,
    required:"Phone number is required",
    unique:true
}, 
email:{
    type:String,
    required:"Email is required",
    unique:true
}, 
password:{
    type:String,
    required:"Password is required",
    minlength:8,
    maxlength:15
},
address:{
    street:{
        type:String},  
    city:{
        type:String},
     pincode:{
    type:String}
 }
},{timestamps:true})
module.exports =mongoose.model('user',userSchema)



