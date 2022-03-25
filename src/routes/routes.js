const express = require('express');
const router = express.Router();

const bookController=require("../controllers/bookController")
const reviewController=require("../controllers/reviewController")
const userController=require("../controllers/userController")


//createBook 
router.post("/createBook",bookController.createBook)


//createUser

router.post("/createUser",userController.createUser)











module.exports = router;