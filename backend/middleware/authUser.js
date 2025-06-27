const jwt = require('jsonwebtoken')

const verifyUser = async (req,res,next)=>{
    
    try {

        const token = req.header.Authorization;
        console.log(token);
        

        if(!token){
            res.status(401).json({
                ok:false,
                message:"No token found!"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next();
    
    } 
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports =  verifyUser