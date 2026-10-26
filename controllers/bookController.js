const books=require('../models/bookModel')

exports.addBookController=async(req,res)=>{
    console.log("Inside addBookController")
    const {title,author,imageURL,pages,price,discountPrice,abstract,publisher,isbn,language,category}=req.body
    const uploadImages=req.files.map(item=>item.filename)
    const sellerMail=req.payload
    const existingBook=await books.findOne({title,sellerMail})
    if(existingBook){
        res.status(409).json("Book Already Exists...")
    }else{
        const newBook=await books.create({title,author,imageURL,pages,price,discountPrice,abstract,publisher,isbn,language,category,uploadImages,sellerMail})
        res.status(201).json(newBook)
    }
}

exports.getAllBooksController=async(req,res)=>{
    console.log("getAllBooksController")
    const loginUserMail=req.payload
    const searchKey=req.query.search
    const allBooks=await books.find({sellerMail:{$ne:loginUserMail},title:{$regex:searchKey,$options:'i'}})
    res.status(200).json(allBooks)
}

exports.getHomeBookController=async(req,res)=>{
    console.log("getHomeBookController")
    const homeBooks=await books.find().sort({_id:-1}).limit(4)
    res.status(200).json(homeBooks)
}

exports.getUserBooksController=async(req,res)=>{
    console.log("getUserBooksController")
    const loginUserMail=req.payload
    const userBooks=await books.find({sellerMail:loginUserMail})
    res.status(200).json(userBooks)
}

exports.getUserBoughtBooksController=async(req,res)=>{
    console.log("getUserBoughtBooksController")
    const loginUserMail=req.payload
    const userBoughtBooks=await books.find({buyerMail:loginUserMail})
    res.status(200).json(userBoughtBooks)
}

exports.deleteUploadBooksController=async(req,res)=>{
    console.log("deleteUploadBooksController")
    const {id}=req.params
    const deleteBook=await books.findByIdAndDelete({_id:id})
    res.status(200).json(deleteBook)
}

exports.viewBookController=async(req,res)=>{
    console.log("viewBookController")
    const [id]=req.params
    const bookDetails=await books.findById({_id:id})
    res.status(200).json(bookDetails)
}

