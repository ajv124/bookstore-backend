const express=require('express')
const userController =require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const router=new express.Router()
const multerMiddleware=require('../middlewares/multerMiddleware')
const bookController = require('../controllers/bookController')

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// google login
router.post('/google-login',userController.googleLoginController)

router.put('/user/:id',authMiddleware,multerMiddleware.single('picture'),userController.userEditController)

router.post('/book',authMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)

router.get('/all-books',authMiddleware,bookController.getAllBooksController)

router.get('/user-books',authMiddleware,bookController.getUserBooksController)

router.get('/bought-books',authMiddleware,bookController.getUserBoughtBooksController)

router.get('/home-books',authMiddleware,bookController.getHomeBookController)

router.delete('/book/:id',authMiddleware,bookController.deleteUploadBooksController)

router.get('/view-book/:id',authMiddleware,bookController.viewBookController)

module.exports = router