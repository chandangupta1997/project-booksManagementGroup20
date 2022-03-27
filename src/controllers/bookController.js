const bookModel =require("../models/bookModel")
const reviewModel=require("../models/reviewModel")
const userModel =require("../models/userModel")
const createbook=async function(req, res) {
    try{
        let createdbook=await bookModel.create(req.body)
        return res.status(200).send({status:true,msg:"Book is successfully created",data:createdbook});
    }catch(err){
        res.status(500).send({status:false,err:err.message});
    }
}
    module.exports = {createbook}





