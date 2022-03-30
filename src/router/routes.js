const express = require('express');
const router = express.Router();
const bookController=require("../controllers/bookController")
const reviewController=require("../controllers/reviewController")
const userController=require("../controllers/userController")
const middleware = require("../middleware/auth")

//createUser
router.post("/createUser",userController.createUser)
router.post("/loginUser",userController.loginUser)
//createBook 
router.post("/createBook",bookController.createBook)
router.get("/getBook",bookController.getBook)
router.get("/books/:bookId",bookController.getBooksById)

router.put("/books/:bookId",bookController.updateBookById)
router.delete("/books/:bookId",bookController.deleteById)



// adding Review 
router.post("/books/:bookId/review",reviewController.addReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)
module.exports = router;
