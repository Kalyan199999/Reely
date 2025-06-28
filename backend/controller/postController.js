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

// get post By user Id
const getPostById = async (req, res) => {

    try {
        const { id } = req.params;
        
        // What parameter are passed in the populate only that parameter will be populated
        // .populate("user_id", "username name");
        const post = await Post.find({user_id:id})

        if(!post) {
            return res.status(404).json({
                message:"post not found!",
                ok:false
            })
        }

        return res.status(200).json({
            message:"Get By Id fetched successfully",
            ok:true,
            data:post
        })
    } 
    catch (error) {
        return res.status(500).json({
            message:"Get By Id fetching failed!",
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