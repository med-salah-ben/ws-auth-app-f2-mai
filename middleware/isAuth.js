const jwt = require('jsonwebtoken');
require('dotenv').config({path:"../.env"});
const User =require('../model/User');


const isAuth = async(req,res,next)=>{
    console.log("req : " , req.user)
    try {
        //get token from req headers 
        const token = req.headers['x-auth-token'];
        //check if token exist
        if(!token){
            return res.status(400).send({msg:"no token unauthorized"})
        }
        const decode = await jwt.verify(token , process.env.SecretKey)
        //Get user By ID from payload
        const user = await User.findById(decode.id)
        if(!user){
            return res.status(400).send({msg:"unauthorized"});
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({msg : "Token not valid"})
    }
}


module.exports = isAuth