const Post = require('../model/postModel')

// create the post
const createPost = async (req, res) => {

    try {

        const { user_id , description } = req.body;
        const post = req.files;

        const myPost = await Post.create({ user_id , description , post });

        await myPost.save();

        return res.status(200).json({
            ok:true,
            data:myPost,
            message:"post created successfully!"
        })
    } 
    catch (error) 
    {
        return res.status(500).json({
            message:"post creation failed!",
            error:error.message,
            ok:false
        })
    }
}

const getPost = async (req, res) => {
    
    try {

        const post = await Post.find().populate('user_id');

        return res.status(200).json({
            ok:true,
            data:post,
            message:"post fetched successfully!"
        })
    } 
    catch (error) 
    {
        return res.status(500).json({
            message:"post fetching failed!",
        })
    }
}

// get post
const getPostById = async (req, res) => {

    try {
        const { id } = req.params;
        console.log(id);
        
        
        const post = await Post.findById(id).populate('user_id');

        if(!post) {
            return res.status(404).json({
                message:"post not found!",
                ok:false
            })
        }

        return res.status(200).json({
            message:"post fetched successfully",
            ok:true,
            data:post
        })
    } 
    catch (error) {
        return res.status(500).json({
            message:"post fetching failed!",
            ok:false,
            error:error.message
        })
    }
}


module.exports = {
    createPost,
    getPost,
    getPostById
}