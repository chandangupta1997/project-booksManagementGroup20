const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const validations = require('../validations/validator')

const isValidTitle = function (title) {
    return ["Mr", "Miss", "Mrs"].indexOf(title) !== -1
}
const createUser = async function (req, res) {
    try {

        if (!validations.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Parameters in the request body are not valid.Plese enter valid parameters" })
        }
        let { title, name, phone, email, password } = req.body
        if (!validations.isValid(title)) {
            return res.status(400).send({ status: false, message: "Title is required" })
        }
        if (!isValidTitle(title)) {
            return res.status(400).send({ status: false, message: "Title must be among Mr,Mrs,Miss" })
        }

        if (!validations.isValid(name)) {
            return res.status(400).send({ status: false, message: "Name is required" })
        }
        if (!validations.isValid(phone)) {
            return res.status(400).send({ status: false, message: "Phone is required" })
        }
        if (!(String(phone).length === 10)) {
            return res.status(400).send({ status: false, message: "Please enter valid phone number" })
        }
        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone)) {
            return res.status(400).send({ status: false, message: `${phone} is not a valid phone number` })
        }
        const isPhonealreadyExist = await userModel.findOne({ phone })
        if (isPhonealreadyExist) {
            return res.status(400).send({ status: false, message: `${phone} Phone number already exists` })
        }
        if (!validations.isValid(email)) {
            return res.status(400).send({ status: false, message: "Email is required" })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "Email is not valid. Please provide a valid email" })
        }
        const isEmailalreadyExist = await userModel.findOne({ email:email })
        if (isEmailalreadyExist) {
            return res.status(200).send({ status: false, message: "Email already exists" })
        }
        if (!validations.isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is required" })
        }
        if (!validations.isValid(password.trim().lenght >= 8 || password.trim().length <= 15)) {
            res.status(400).send({ status: false, message: "Please enter a password of at least 8 characters but less than 16 characters" })
        }
        let savedUser = await userModel.create(req.body)
        return res.status(201).send({ status: true, message: "Successfully created", data: savedUser })

    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}
const loginUser = async function (req, res) {
    try {
        const requestBody = req.body
        if (!validations.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters" })
        }
        const { email, password } = req.body
        if (!validations.isValid(email)) {
            return res.status(400).send({ status: false, message: "Email is required" })
        }
        if (!validations.isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is required" })
        }
        const user=await userModel.findOne({email:email, password:password})
        if(!user) {
            return res.status(400).send({ status: false, message: "Invalid login credentials"})
        }
        let token = await jwt.sign(
            {
                userId: user._id.toString(),
                batch:"thorium",
                organisation:"Function"
            },
            "Group20"
        )
        res.setHeader("x-api-key",token);
        res.status(200).send({status: true, message:"User login successful",data:(token)})
    } catch (err) {
        return res.status(400).send({ status: false, error: err.message })
    }
}
    module.exports = { createUser ,loginUser}
