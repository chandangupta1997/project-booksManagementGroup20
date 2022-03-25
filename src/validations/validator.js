


const isValid =function(value){
    if(typeof value ==='undefined'|| value===null) return false 
    if(typeof value==='string' && value.trim().length===0) return false 
    return true
   



}



const isValidObjectId=function(objectId){
    return mongoose.Types.ObjectId.isvalid(objectId)
    
    
    
}

const isValidRequestBody=function(requestBody){
    return Object.keys(requestBody).length>0
}

//this is a change