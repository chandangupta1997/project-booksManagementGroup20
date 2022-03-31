const express = require('express');
const router = express.Router();
const bookController=require("../controllers/bookController")
const reviewController=require("../controllers/reviewController")
const userController=require("../controllers/userController")
const middleware = require("../middleware/auth")

//createUser
router.post("/register",userController.createUser)
router.post("/login",userController.loginUser)
//createBook 
router.post("/books",middleware.authorise,bookController.createBook)
router.get("/getBooks",bookController.getBook)
router.get("/books/:bookId",bookController.getBooksById)

router.put("/books/:bookId",middleware.authorise,bookController.updateBookById)
router.delete("/books/:bookId",middleware.authorise,bookController.deleteById)



// adding Review 
router.post("/books/:bookId/review",reviewController.addReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)
module.exports = router;
