const bookModel =require("../models/bookModel")
const reviewModel=require("../models/reviewModel")
const userModel =require("../models/userModel")
const validations =require("../validations/validator")




const createBook = async function(req,res){
    

    try{

        let data = req.body 
    if(!validations.isValidRequestBody(data)){
        res.status(400).send({status:"false",msg:"body should not be empty "})
        return
    }

    //validation starts


    const {title,excerpt,userId,ISBN,category,subCategory,reviews,releasedAt}=data



    if(!validations.isValid(title)){
        res.status(400).send({status:"false",msg:"please enter valid title"});
        return
    }
    if(!validations.isValid(excerpt)){
     res.status(400).send({status:"false",msg:"please enter valid excerpt"});
     return
    }

    //check it in mongoose also 
    if(!validations.isValid(userId)){
     res.status(400).send({status:"false",msg:"please enter valid userId"});
     return
    }
    if(!validations.isValid(ISBN)){
     res.status(400).send({status:"false",msg:" ISBN is empty"});
     return
    }
    if(!validations.isValid(category)){
     res.status(400).send({status:"false",msg:"please enter valid category"});
     return

    }

    if(!validations.isValid(subCategory)){
        res.status(400).send({status:"false",msg:"please enter valid subCategory"});
        return}

    // if(validations.isValid(reviews)){ 
    //     res.status(400).send({status:"false",msg:"reviews should not be empty 56"})
    //     return
    // //  


    
           
     // format("YYYY-MM-DD")}, use regex or any other technique        
     if(!validations.isValid(releasedAt)){
         res.status(400).send({status:"false",msg:"released at  should not be empty"})
            return}
    



    

    //validation finish

   // const bookData={title,excerpt,userId,ISBN,category,} // accessing it for blog Creation

   //later on we will destructure data 

    const newBook = await bookModel.create(data)
    res.send(newBook)
    

    }

    catch(error){

        res.status(500).send({status:"false",msg:error.message})
    }
}


const getBook = async function(req,res){

    try{
        const  queryBody =req.query
        const filterQuery={isDeleted:false};


        if(!validations.isValidRequestBody(queryBody)){
            
            res.status(400).send({status:"false",msg:"query body should not br empty "});
            return;
        }

        // validations starts so deconstructring 

        const{userId,subCategory,category,title}=queryBody

        filterQuery['userId']=userId  //adding in filters


        // is userId exists or not 

        if(validations.isValidObjectId(userId)){
            filterQuery['userId']=userId  //adding in filters

            
        }
        


        if(validations.isValid(subCategory)){
            filterQuery['subCategory']=subCategory
        
        }
        if(validations.isValid(category)){
            filterQuery['category']=category
            
        }
        if(validations.isValid(title)){
            filterQuery['title']=title.trim()
            
        }



        const blogs=await bookModel.find(filterQuery)

        //The Array.isArray() method determines whether the passed value is an Array.
        if(Array.isArray(blogs)&&blogs.lenght===0){
            res.status(400).send({status:"false",msg:`no blogs found please try different variations`});
            return;
        }

        // we need to short in alphabatical order

        res.status(200).send({status:"true",message:"here is your Blog",data:blogs})
    }

    catch(error){res.status(500).send({status:"false",msg:error.message});return}

    
    



}

const updateBook =async function(req,res){

}


const deleteBook =async function(req,res){

    let bookId =req.param  // kyuki wo  param ma di hai 
    // validate it 


    //checkin exist or not 

    let bookById = await bookModel.findOne({_id:bookId})
    //agr hai to bhejo nhi to aage badho 


    


   



}





module.exports.createBook =createBook
module.exports.getBook=getBook
module.exports.updateBook=updateBook
module.exports.deleteBook=deleteBook
