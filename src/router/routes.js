const express = require('express');
const router = express.Router();

const bookController=require("../controllers/bookController")
const reviewController=require("../controllers/reviewController")
const userController=require("../controllers/userController")


//createBook 
router.post("/createBook",bookController.createBook)
router.get("/getBook",bookController.getBook)
router.put("/updateBook",bookController.updateBook)
router.put("/deleteBook",bookController.deleteById)


//createUser

router.post("/createUser",userController.createUser)


router.post("/loginUser",userController.loginUser)




// adding Review 

router.post("/addReview/:bookId/review",reviewController.addReview)











module.exports = router;