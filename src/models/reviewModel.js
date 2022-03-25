const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId
const reviewSchema=new mongoose.Schema({
    bookId:{
        type:ObjectId,
        required:"bookId is required",
       // refs:bookModel
    },
    reviewedBy:{
        type:String,
        required:"ReviewedBy is required",
        default :'Guest'
    },
    reviewedAt: {
        type:Date,
        required:"ReviewedAt is required"
    },
    rating: {
        type:Number,
        minlength:1, 
        maxlength:5,
        required:"Rating is required"
    },
    review: {
        type:String,
    },
    isDeleted: {
        type:Boolean,
        default:false
    }
});
module.exports =mongoose.model('review', reviewSchema);