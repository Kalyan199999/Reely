const express = require('express');

const { createPost,getPost,getPostById } = require('../controller/postController')
const {uploadPost}  = require('../multerHandler/imageUpload');
const verifyUser = require('../middleware/authUser')


const postRouter = express.Router();

postRouter.post('/',verifyUser ,uploadPost.array( 'userpost' , 10 ) , createPost )

postRouter.get('/' , getPost )

postRouter.get('/:id', verifyUser , getPostById )

module.exports = postRouter