const bookModel =require("../models/bookModel")
const reviewModel=require("../models/reviewModel")
const userModel =require("../models/userModel")
const validations =require("../validations/validator")




const createBook = async function(req,res){
    

    try{

        let data = req.body 
    if(!validations.isValidRequestBody(data)){
        res.status(400).send({status:"false",msg:"body should not be empty "})
        return
    }

    const {title,excerpt,userId,ISBN,category,subcategory,reviews}=data

    //validation starts

    //validation finish

   // const bookData={title,excerpt,userId,ISBN,category,} // accessing it for blog Creation

   //later on we will destructure data 

    const newBook = await bookModel.create(data)
    res.send(newBook)
    

    }

    catch(error){

        res.status(500).send({status:"false",msg:error.message})
    }
}


module.exports.createBook =createBook
