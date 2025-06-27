const express = require('express')

const {uploadProfile} = require('../multerHandler/imageUpload')

const { getAllUser,getUserByID,createUser,login,updateUser } = require('../controller/userController')

const verifyUser = require('../middleware/authUser')

const userRouter = express.Router()

userRouter.get('/', getAllUser )

userRouter.get('/:id' , verifyUser, getUserByID)

userRouter.post('/',uploadProfile.single('user_profile_image'), createUser)

userRouter.post('/login',login)

userRouter.put('/:id', uploadProfile.single('user_profile_image'), updateUser)

module.exports = userRouter