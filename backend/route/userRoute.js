// Specify the user routes

const express = require('express')

const { uploadProfile } = require('../multerHandler/imageUpload')

const { getAllUser,getUserByID,createUser,login,updateUser,searchUserByUsername } = require('../controller/userController')

const verifyUser = require('../middleware/authUser')

const userRouter = express.Router()

// get the user details
userRouter.get('/', getAllUser )

userRouter.get('/search/:username',searchUserByUsername);

userRouter.get('/:id' , getUserByID)


// create the new user
userRouter.post('/',uploadProfile.single('profile_photo'), createUser)

// login 
userRouter.post('/login',login)

// update the user
userRouter.put('/:id',verifyUser, uploadProfile.single('profile_photo'), updateUser)

module.exports = userRouter