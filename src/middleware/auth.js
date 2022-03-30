const jwt=require('jsonwebtoken');
const userModel=require('../models/userModel')
const bookModel =require('../models/bookModel');
const verify = require('jsonwebtoken/verify');
let authenticate= async function(req, res, next){
    try{
        let token=req.headers['x-api-key']
        if(!token)
        return res.status(400).send({status:false, message:"Please provide a valid token"})
    let validatetoken=jwt.verify(token,"Group20")
    if(!validatetoken)
    return res.status(400).send({status:false, message:"Authentication failed"})
    next()
    }catch(err){
        console.log("This is the error:",err.message)
        res.status(500).send({status:false,error:err.message})
    }
}
let authorise=async function(req, res, next){
    try{
    let bookId=req.params.bookId

    let jwtToken=req.headers['x-api-key']
    
    if(!jwtToken)
    return res.status(400).send({status:false, message:"Please provide a valid token"})
        
        let verifiedToken=jwt.verify(jwtToken,"Group20")
        let decodedId = verifiedToken.userId
        console.log(decodedId)
        
    
        let findBook = await bookModel.findById(bookId)
        let userId = findBook.userId
        if (userId != decodedId)
        {
           return res.status(400).send({status:false,message:"You are not authorised"})
        }
         next()
    }catch(err){
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}
module.exports.authenticate = authenticate
module.exports.authorise = authorise
