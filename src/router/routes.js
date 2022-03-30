const express = require('express');
const router = express.Router();
const bookController=require("../controllers/bookController")
const reviewController=require("../controllers/reviewController")
const userController=require("../controllers/userController")
const middleware = require("../middleware/auth")

//createBook 
router.post("/createBook",bookController.createBook)
router.get("/getBook",bookController.getBook)
router.get("/books/:bookId",bookController.getBooksById)

router.put("/books/:bookId",bookController.updateBookById)
router.delete("/books/:bookId",bookController.deleteById)

//createUser
router.post("/createUser",userController.createUser)
router.post("/loginUser",userController.loginUser)

// adding Review 
//router.post("/addReview/:bookId/review",reviewContrroller.addReview)

module.exports = router;
