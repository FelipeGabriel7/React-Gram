const User = require("../models/User");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const jwtSecret = process.env.JWT_SECRET;

const auth = async (req , res , next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token){
    return res.status(401).json({error: ["Acesso negado"]});
  }

  try {

    
    const verified = await jwt.verify(token , jwtSecret);

    req.user = await User.findById(verified.id).select("-password")

    next()
    
  } catch (e) {
    return res.status(401).json({error: [" Acesso não permitido , token inválido "]})
  }


 
}

module.exports = auth;