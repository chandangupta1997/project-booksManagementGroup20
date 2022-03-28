const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const userModel = require("../models/userModel")
const validations = require("../validations/validator")
const jwt=require("jsonwebtoken")




const createUser = async function (req, res) {

    try {
        let data = req.body

        if (!validations.isValidRequestBody(data)) {

            res.status(400).send({ status: "false", msg: "body should not be empty " })
            return
        }

        // accesing for User validation
        const { title, name, phone, email, password, address } = data


        //validation starts
        if (!validations.isValid(title)) {
            res.status(400).send({ status: "false", msg: "please enter valid title" })
            return
        }
        if (!validations.isValid(name)) {
            res.status(400).send({ status: "false", msg: "please enter valid name" })
            return
        }
        if (!validations.isValid(phone)) {
            res.status(400).send({ status: "false", msg: "please enter valid phone  " })
            return
        }
        //phom=ne number regex

        if(!(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone))){
            return res.status(400).send({status:false,msg:"Number should be a valid Number line 40"})
        }

        const isphoneAlreadyExist=  await userModel.findOne({phone})//findOne({email:email})
        if(isphoneAlreadyExist){res.status(400).send({status:"false",msg:`${phone} already exist `});return}


        if (!validations.isValid(email)) {
            res.status(400).send({ status: "false", msg: "please enter valid email" })
            return
        }

        // email validation using regex 


        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({status: false, message: `Email should be a valid email address`})
            return
        }

        const isEmailAlreadyExist=  await userModel.findOne({email})//findOne({email:email})
        if(isEmailAlreadyExist){res.status(400).send({status:"false",msg:`${email} already exist `});return}

        if (!validations.isValid(password)) {
            res.status(400).send({ status: "false", msg: "please enter valid phone" })
            return

        }
        if (password.trim().lenght < 3 || password.trim().length > 16) {
            res.status(400).send({ status: false, msg: "please enter a   15 >passsword>3 " });
            return
        }

        //email validations







        // validation ends 

        //accesing it for blog creation

        const bookData = { title, name, phone, email, password, address }

        const newBook = await userModel.create(data)

        res.status(201).send({ status: "true", msg: "book created successfully ", see: newBook })

    }



    catch (error) { res.send({ status: "false", msg: error.message }) }





}





//authnetication providing token

const loginUser = async function (req, res) {



    try {
        let requestBody = req.body

        if (!validations.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: "false", msg: "body should not be empty pls enter username and pwd  " })
            return
        }
        
        

        const { email, password } = requestBody // destructuting for validation

        //validation starts

        if (!validations.isValid(email)) {
            res.status(400).send({ status: "false", msg: "please enter valid email" })
            return

        }
        if (!validations.isValid(password)) {
            res.status(400).send({ status: "false", msg: "please enter valid password" })
            return

        }

        // you can skip email and password validation as it is checked earlier 
        // we just need to find that it exist in database or not 

        // let author =await userModel.findOne({email:email},{password:password})

        let user = await userModel.findOne({ email, password })
        if (!user) { res.status().send({ status: false, msg: "gaddar" }); return }


        // issuing token

        let token = jwt.sign({

            userId: user._id,
            batch:"thorium",
            iat: Date.now(), // time 
            expiry: Date.now() + 10*60*60  //expiry 30 min so 1800s


        }, "room20")

        res.setHeader["x-auth-key", token] //sending in header 

        res.status(200).send({ status: "true", msg: "user login successfull", data: { token } })

    }



    catch (error) { res.status(500).send({ status: "false", msg: error.message }) }


}



const getUser =async function(req,res){


}






module.exports.loginUser = loginUser
module.exports.createUser = createUser
module.exports.getUser=getUser




