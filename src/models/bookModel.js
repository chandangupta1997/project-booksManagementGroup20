const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
const bookSchema=new mongoose.Schema({
    title: {
        type:String,
        required:"Title is required",
        unique:true,
        trim:true
    }, 
    excerpt: {
       type:String, 
       required:"Excerpt is required",
       trim:true
    },
    userId: {
        type:ObjectId,
        refs:'userModel',
        required:"UserId is required"
    },
    ISBN: {
        type:String,
        required:"ISBN is required",
        unique:true,
        trim:true
    },
    category: {
        type:String,
        required:"Category is required",
        trim:true
    },
    subCategory: {
        type:String,
        required:"Subcategory is required",
        trim:true
    },
    reviews: { // ref and pop use krna hai 
        type:Number,
        default:0,
        trim:true
    },
    deletedAt: {
        type:Date
    },
    isDeleted: {
        type:Boolean,
        default:false,
        trim:true
    },
    //{Date, mandatory, format("YYYY-MM-DD")}
    releasedAt:{
        type:Date,//iska format lena hai 
        required:"Date is required",
        trim:true
    }
    },{timestamps:true})
    module.exports =mongoose.model("Book",bookSchema)