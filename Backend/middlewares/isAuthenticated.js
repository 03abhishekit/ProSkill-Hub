


import jwt from "jsonwebtoken";

const isAuthenticated = async(req,res, next)=>{
    try{
        const  token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not Authenticated",
                success:false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid Token",
                success:false,
            })
        }
        req.id = decode.userId;
        next();
    } 
    catch(error){
        return res.status(500).json({
            success : false,
            message : "User not available",
            error: error.message,
          })
    }
}




export default isAuthenticated;