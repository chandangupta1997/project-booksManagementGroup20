const express = require('express');
const router = express.Router();

const bookController=require("../controllers/bookController")
const reviewController=require("../controllers/reviewController")
const userController=require("../controllers/userController")


//createBook 
router.post("/createBook",bookController.createBook)
router.get("/getBook/books/:bookId",bookController.getBooksById)
router.get("/getBook",bookController.getBook)
router.put("/updateBook/books/:bookId",bookController.updateBookById)
router.put("/deleteBook/books/:bookId",bookController.deleteById)


//createUser

router.post("/createUser",userController.createUser)


router.post("/loginUser",userController.loginUser)




// adding Review 

router.post("/addReview/books/:bookId/review",reviewController.addReview)












module.exports = router;