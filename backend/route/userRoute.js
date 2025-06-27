// Specify the user routes

const express = require('express')

const { uploadProfile } = require('../multerHandler/imageUpload')

const { getAllUser,getUserByID,createUser,login,updateUser } = require('../controller/userController')

const verifyUser = require('../middleware/authUser')

const userRouter = express.Router()

// get the user details
userRouter.get('/', getAllUser )

userRouter.get('/:id' , verifyUser, getUserByID)

// create the new user
userRouter.post('/',uploadProfile.single('user_profile_image'), createUser)

// login 
userRouter.post('/login',login)

// update the user
userRouter.put('/:id', uploadProfile.single('user_profile_image'), updateUser)


module.exports = userRouter