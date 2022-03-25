const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
const bookSchema=new mongoose.Schema({
    title: {
        type:String,
        required:"Title is required",
        unique:true
    }, 
    excerpt: {
       type:String, 
       required:"Excerpt is required"
    },
    userId: {
        type:ObjectId,
        refs:'userModel',
        required:"UserId is required"
    },
    ISBN: {
        type:String,
        required:"ISBN is required",
        unique:true
    },
    category: {
        type:String,
        required:"Category is required"
    },
    subcategory: {
        type:String,
        required:"Subcategory is required"
    },
    reviews: {
        type:Number,
        default:0
    },
    deletedAt: {
        type:Date
    },
    isDeleted: {
        type:Boolean,
        default:false
    },
    releasedAt:{
        type:Date,
        required:"Date is required"
    }
    },{timestamp:true})
    module.exports =mongoose.model("Book",bookSchema)