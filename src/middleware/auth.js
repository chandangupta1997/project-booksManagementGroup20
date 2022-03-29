const express = require('express');
const router = express.Router();
const bookController=require("../controllers/bookController")
const reviewController=require("../controllers/reviewController")
const userController=require("../controllers/userController")
const middleware = require("../middleware/auth")

//createBook 
router.post("/createBook",bookController.createBook)
router.get("/getBook",bookController.getBook)
router.get("/book/:bookId",middleware.authorise,bookController.getBooksById)

router.put("/book/:bookId",middleware.authorise,bookController.updateBookById)
router.delete("/book/:bookId",middleware.authorise,bookController.deleteById)

//createUser
router.post("/createUser",userController.createUser)
router.post("/loginUser",userController.loginUser)

// adding Review 
//router.post("/addReview/:bookId/review",reviewContrroller.addReview)

module.exports = router;
