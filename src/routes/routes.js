const express = require('express');
const router = express.Router();

const bookController=require("../controllers/bookController")
const reviewController=require("../controllers/reviewController")
const userController=require("../controllers/userController")


//createBook 
router.post("/createBook",bookController.createBook)
router.get("/getBook",bookController.getBook)
router.put("/updateBook",bookController.updateBook)


//createUser

router.post("/createUser",userController.createUser)
router.get("/getUser",userController.getUser)

router.post("/loginUser",userController.loginUser)


//










module.exports = router;