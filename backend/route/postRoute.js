const express = require('express');

const { createPost,getPost,getPostById } = require('../controller/postController')
const {uploadPost}  = require('../multerHandler/imageUpload');
const verifyUser = require('../middleware/authUser')

const postRouter = express.Router();

postRouter.post('/',verifyUser ,uploadPost.array( 'userpost' , 10 ) , createPost )

// Get all the available posts
postRouter.get('/all-posts'  , getPost )

// Get all the posts of the user
postRouter.get('/:id' , getPostById )

module.exports = postRouter