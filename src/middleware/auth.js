const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')
const bookModel = require('../models/bookModel');
const validations = require('../validations/validator.js');
const verify = require('jsonwebtoken/verify');
let authorise = async function (req, res, next) {
    try {


        let token = req.headers["x-api-key"]
        if (!token) { return res.status(400).send({ Status: false, msg: "Token must be present" }) }

        let decodedToken = jwt.verify(token, 'Group20')
        if (!decodedToken) { return res.status(400).send({ status: false, msg: "Invalid token id" }) }

        if (userId = req.body.userId) {
            if (decodedToken.userId != req.body.userId) return res.status(400).send({ status: false, msg: "You are not authorised user" })
        }

        if (bookId = req.params.bookId) {
            const bookId = req.params.bookId
            if (!(validations.isValid(bookId) && validations.isValidObjectId(bookId))) {
                return res.status(400).send({ status: false, msg: "BookId not valid" })
            }
            let book = await bookModel.findOne({ _id: req.params.bookId })
            if (decodedToken.userId != book.userId) return res.status(400).send({ status: false, msg: "You are not authorised user " })

        }

        next()
    } catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.authorise = authorise
