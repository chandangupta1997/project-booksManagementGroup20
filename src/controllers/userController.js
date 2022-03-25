const bookModel =require("../models/bookModel")
const reviewModel=require("../models/reviewModel")
const userModel =require("../models/userModel")
const validations=require("../validations/validator")




const createUser=async function(req, res) {
    
       try{
        let data =req.body 

        if(!validations.isValidRequestBody(data)){
 
         res.status(400).send({status:"false",msg:"body should not be empty "})
         return
        }
 
        // accesing for User validation
        const {title,name,phone,email,password,address}=data
 
 
        //validation starts
        if(!validations.isValid(title)){
            res.status(400).send({status:"false",msg:"please enter valid title"})
            return
        }
        if(!validations.isValid(name)){
         res.status(400).send({status:"false",msg:"please enter valid name"})
         return
        }
        if(!validations.isValid(phone)){
         res.status(400).send({status:"false",msg:"please enter valid phone "})
         return
        }
        if(!validations.isValid(email)){
         res.status(400).send({status:"false",msg:"please enter valid email"})
         return
        }
        if(!validations.isValid(password)){
         res.status(400).send({status:"false",msg:"please enter valid phone"})
         return
    
        }
        if(password.trim().lenght<3||password.trim().length>16){
            res.status(400).send({status:false,msg:"please enter a   15 >passsword>3 "})
        }

        // please add passoword min max 
        // if(!validations.isValid(address)){
        //  res.status(400).send({status:"false",msg:"please enter valid address"})
        //  return
        // }
 
 
 
 
        // validation ends 
 
      //accesing it for blog creation
 
        const bookData={title,name,phone,email,password,address}
 
        const newBook = await userModel.create(data)
 
        res.status(201).send({status:"true",msg:"book created successfully ",see:newBook})
 
     }
    


     catch(error){res.send({status:"false",msg:error.message})}
      




}

    module.exports.createUser=createUser




