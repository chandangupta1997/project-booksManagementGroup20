const bookModel =require('../models/bookModel')
const userModel = require('../models/userModel')
const reviewModel= require('../models/reviewModel')
const validations = require('../validations/validator.js')
const createBook=async function(req, res) {
    try{
        if (!validations.isValidRequestBody(req.body)) 
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid details' })
        
            let { title, excerpt, userId ,ISBN ,category,subCategory,reviews,isDeleted,releasedAt} = req.body
        
         const titlee = await bookModel.findOne({title:title})
        if(titlee)
        {
            return res.status(400).send({ status:false, message: 'Title already exists'})
        }
        
        if (!validations.isValid(title)) 
        return res.status(400).send({ status: false, message: `title is required` })

        if (!validations.isValid(excerpt)) {
        return res.status(400).send({ status: false, message: `excerpt is required` })
        }
        
       // book id validation 
        if(!validations.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message:`${userId} is not a valid userId`})
    
       }
       const userDetails=await userModel.findById(userId)
            if(!userDetails) {
            return res.status(400).send({ status: false, message:"No user exist by this id"})
        }
       if(!validations.isValid(ISBN)){
           return res.status(400).send({ status: false, message:"Isbn is required"})
       }
       const isISBNalreadyexist=await bookModel.findOne({ISBN:ISBN})
       if(isISBNalreadyexist){
           return res.status(400).send({ status: false, message:"This ISBN is already exist"})
       }
       if(!validations.isValid(category)){
           return res.status(400).send({ status: false, message:"Category is required"})
       }
       if(!validations.isValid(subCategory)){
           return res.status(400).send({ status: false, message:"subCategory is required"})
        }
        if (!validations.isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: ' Please provide a valid ReleasedAt date' })

        }
        
        if (!/((\d{4}[\/-])(\d{2}[\/-])(\d{2}))/.test(releasedAt)) {
            return res.status(400).send({ status: false, message: ' \"YYYY-MM-DD\" this Date format & only number format is accepted ' })
        }
        const bookData = {
            title, excerpt,userId,ISBN,category, subCategory, reviews, releasedAt,
            isDeleted: isDeleted ? isDeleted : false,
             deletedAt: isDeleted ? new Date() : null
        }
        const newBook = await bookModel.create(bookData)
        return res.status(201).send({ status: true, message: 'New book created successfully', data: newBook })

    } catch (error) {
        console.log(error)
       return res.status(500).send({ status: false, message: error.message });
    }
}


//-----------------------------------------------------------------------------------------------------------------
const getBook = async (req, res) => {
    try {
        let filter = {
            isDeleted: false

        }
        if (req.query.userId) {

            if (!(validations.isValid(req.query.userId) && validations.isValidObjectId(req.query.userId))) {
                return res.status(400).send({ status: false, msg: "userId is not valid" })
            }
            filter["userId"] = req.query.userId
        }
        if (req.query.category) {

            if (!validations.isValid(req.query.category)) {
                return res.status(400).send({ status: false, message: 'Book category is not valid ' })
            }
            filter["category"] = req.query.category
        }
        if (req.query.subCategory) {

            if (!validations.isValid(req.query.subCategory)) {
                return res.status(400).send({ status: false, message: 'Book subCategory is not valid' })

            }
            filter["subCategory"] = req.query.subCategory
        }
        let book = await bookModel.find(filter).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })

        if (book.length > 0) {
            return res.status(200).send({ status: true, message: "book  list", data: book })

        } else {
            return res.status(404).send({ status: false, message: "no such book found !!" })

        }
    } catch (err) {
         return res.status(500).send({ status: false, error: err.message })
    }
}

//-----------------------------------------------------------------------------------------------------------------
const getBooksById= async (req, res) => {
    try{
        if (!(validations.isValid(req.params.bookId) && validations.isValidObjectId(req.params.bookId))) {
            return res.status(400).send({ status: false, msg: "bookId is not valid" })
    }
    let books = await bookModel.findOne({ _id: req.params.bookId, isDeleted: false })
    if (!books) {
        return res.status(404).send({ status: false, message: "no such book found !!" })
        }
        let addedrew = JSON.parse(JSON.stringify(books))
        let findrew = await reviewModel.find({bookId:req.params.bookId}) 
        addedrew["reviewData"]  = [...findrew]  
    
        return res.status(200).send({ status: true, message: "book  list", data:addedrew })
     
} catch (err) {
    return res.status(500).send({ status: false, error: err.message })
}
}


//-----------------------------------------------------------------------------------------------------------------
const updateBookById = async (req, res) => {
    try {
        let filter = {
            _id: req.params.bookId,
            isDeleted: false
        }
        let update = {}
        if (!validations.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: 'body is empty' })
        }
        const book = await bookModel.findOne({ _id: req.params.bookId, isDeleted: false })
        if (!book) {
            return res.status(404).send({ status: false, message: `Book not found by the given id` })
        
        }
        let { title, excerpt, releasedAt, ISBN } = req.body

        if (title) {
               if (!validations.isValid(title)) {
                return res.status(400).send({ status: false, message: 'title is not valid or empty' })
            }

            let titleCheck= await bookModel.findOne({title:title})
            if(titleCheck){res.status(400).send({status:"false",msg:" title already in USe "});
            return }
            update['title'] = title
        }
        if (excerpt) {
            if (!validations.isValid(excerpt)) {
                return res.status(400).send({ status: false, message: 'excerpt is not valid ' })
            }

            let excerptCheck= await bookModel.findOne({excerpt:excerpt})
            if(excerptCheck){res.status(400).send({status:"false",msg:" excerpt already in use "});
            return }
            update['excerpt'] = excerpt
        }
        if (ISBN) {
                if (!validations.isValid(ISBN)) {
                return res.status(400).send({ status: false, message: 'ISBN is not valid ' })
            }

            let ISBNCheck= await bookModel.findOne({ISBN:ISBN})
            if(ISBNCheck){res.status(400).send({status:"false",msg:"duplicate  ISBN already in use "});
            return }
            update['ISBN'] = ISBN
        }
        if (releasedAt) {
                if (!validations.isValid(releasedAt)) {
                return res.status(400).send({ status: false, message: 'releasedAt is not valid value ' })
            }
            if (!/((\d{4}[\/-])(\d{2}[\/-])(\d{2}))/.test(releasedAt)) {
                return res.status(400).send({ status: false, message:' \"YYYY-MM-DD\" only this Date format is supported'})
            }
        }
        let updatedBook = await bookModel.findOneAndUpdate(filter, update, { new: true })
        if (updatedBook) {
            return res.status(200).send({ status: true, message: "success", data: updatedBook })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, error: err.message })
    }
}


//-----------------------------------------------------------------------------------------------------------------
const deleteById = async (req, res) => {
    try {
         let id = req.params.bookId
        if (!(validations.isValid(req.params.bookId) && validations.isValidObjectId(req.params.bookId))) {
            return res.status(400).send({ status: false, msg: "bookId is not valid" })
        }
        let filter = {
             isDeleted: false,
             _id : id
        }
         
        const book = await bookModel.findOne({ _id: req.params.bookId, isDeleted: false })
        if (!book) {
            return res.status(404).send({ status: false, message: `Book not found or already deleted ` })
        }
        let deletedBook = await bookModel.findOneAndUpdate(filter, { isDeleted: true, deletedAt: new Date() })
        if (deletedBook) {
            return res.status(200).send({ status: true, msg: "Book is successfully deleted" })
        }

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports.createBook = createBook
module.exports.getBook = getBook
module.exports.getBooksById= getBooksById
module.exports.updateBookById = updateBookById
module.exports.deleteById = deleteById
