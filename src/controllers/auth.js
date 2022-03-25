const bookModel =require("../models/bookModel")
const reviewModel=require("../models/reviewModel")
const userModel =require("../models/userModel")

const jwt=require('jsonwebtoken');
const userModel=require('../models/userModel')
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
    let useId=req.params.userId
    let jwtToken=req.headers['x-api-key']
    try{
        let verifiedToken=jwt.verify(jwtToken,"Group20")
        if(verifiedToken.userId=useId)
        return res.status(403).send({status:false,message:"Unauthorised access denied"})
        next()
    }catch(err){
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}
module.exports.authenticate = authenticate
module.exports.authorise = authorise


