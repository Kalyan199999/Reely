const express = require('express');

const { createPost,getPost,getPostById } = require('../controller/postController')


const postRouter = express.Router();

postRouter.post('/' , createPost )

postRouter.get('/' , getPost )

postRouter.get('/:id' , getPostById )

module.exports = postRouter