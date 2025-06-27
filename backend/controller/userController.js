const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Fetch all the users from database
const getAllUser = async (req,res)=>{
    try 
    {
        const user = await User.find();

        return res.status(200).json({
            message:"all user",
            ok:true,
            data:user
        })
    } 
    catch (error) 
    {
        return res.status(500).json({message:"something went wrong",ok:false})
    }
}

// Fetch a single user from database by id
const getUserByID = async (req,res)=>{
    try 
    {
        const id = req.params.id

        const user = await User.findById(id);

        
        return res.status(200).json({
            message:"single user",
            ok:true ,
            data:user
        })
    } 
    catch (error) 
    {
        return res.status(500).json({message:"something went wrong",ok:false})
    }
}

// create a new user into database
const createUser = async (req, res) => {
  try 
  {
    const { username, password, email, name, phone } = req.body;

    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phone,
      name
    });

    await newUser.save();

    const token = jwt.sign(
           { userId: newUser._id, username: newUser.username,email:newUser.email },
           process.env.JWT_SECRET,
      { expiresIn: '1d' } // expires in 1 day
    );

    return res.status(201).json({
      message: "User created successfully",
      ok: true,
      data: newUser,
      token:token
    });
    
  } 
  catch (error) 
  {
    return res.status(500).json({
      message: "Something went wrong",
      ok: false,
      error: error.message
    });
  }
};

const login = async (req, res) => {

    try 
    {
       const {email,password } = req.body;

       const user = await User.findOne({ email });

       if(!user){
        return res.status(401).json({ ok:false , message:"user not found!" })
       }

    //    decrypt the password
       const ismatch = await bcrypt.compare(password,user.password)

       if(!ismatch){
        return res.status(401).json({ ok:false , message:"Invalid Credientials" })
       }

       const token = jwt.sign(
           { userId: user._id, username: user.username,email:user.email },
           process.env.JWT_SECRET,
      { expiresIn: '1d' } // expires in 1 day
    );


       return res.status(200).json({
        ok:true,
        message:"user found! Login successful!",
        data:user,
        token
       })

    } 
    catch (error) 
    {
        return res.status(404).json({ok:false,message:error.message})
    }
}

const updateUser = async (req, res) => {
    try 
    {
        const { id } = req.params;
        const { username, email, name, phone } = req.body;
        const profile_photo = req.file;

        console.log(profile_photo);
        

        const user = await User.findByIdAndUpdate(id, {
            username:username,
            email:email,
            name:name,
            phone:phone,
            profile_photo:profile_photo
        }, { new: true });

        if (!user) {
            return res.status(404).json({ ok: false, message: "User not found" });
        }

        return res.status(200).json({ 
            ok: true,
            message: "User updated successfully", 
            data:user 
        });
    } 
    catch (error) 
    {
        return res.status(500).json({ ok: false, message: error.message });
    }
    
}

module.exports = 
{
    getAllUser,
    getUserByID,
    createUser,
    login,
    updateUser
    
}