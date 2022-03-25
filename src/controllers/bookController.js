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

    //validation starts


    const {title,excerpt,userId,ISBN,category,subCategory,reviews,releasedAt}=data



    if(!validations.isValid(title)){
        res.status(400).send({status:"false",msg:"please enter valid title"})
        return
    }
    if(!validations.isValid(excerpt)){
     res.status(400).send({status:"false",msg:"please enter valid excerpt"})
     return
    }

    //check it in mongoose also 
    if(!validations.isValid(userId)){
     res.status(400).send({status:"false",msg:"please enter valid userId"})
     return
    }
    if(!validations.isValid(ISBN)){
     res.status(400).send({status:"false",msg:" ISBN is empty"})
     return
    }
    if(!validations.isValid(category)){
     res.status(400).send({status:"false",msg:"please enter valid category"})
     return

    }

    if(!validations.isValid(subCategory)){
        res.status(400).send({status:"false",msg:"please enter valid subCategory"})
        return}

    // if(validations.isValid(reviews)){ 
    //     res.status(400).send({status:"false",msg:"reviews should not be empty 56"})
    //     return
    // //  


    
           
     // format("YYYY-MM-DD")}, use regex or any other technique        
     if(!validations.isValid(releasedAt)){
         res.status(400).send({status:"false",msg:"released at  should not be empty"})
            return}
    



    

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
