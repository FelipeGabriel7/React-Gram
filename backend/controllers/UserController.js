const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose")

const jwtSecret = process.env.JWT_SECRET;

function generate(id) {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
}

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(422).json({ error: [" Já existe um usuário com esse email "] });
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    return res.status(422).json({ error: [" Desculpe algo deu errado tente novamente mais tarde."] })
  }

  res.status(201).json({
    id: newUser._id,
    token: generate(newUser._id),
  })

};

const login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ error: [" Esse usuário não existe "] })
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ error: [" Senha inválida "] })
    return;
  }


  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generate(user._id),
  })

}

const getUserProfile = async (req, res) => {

  const user = req.user;

  res.status(200).json(user);
}

const update = async (req, res) => {

  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password");

  if (name) {
    user.name = name;
  }

  if (password) {

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;

  }

  if(profileImage){
    user.profileImage = profileImage; 
  }

  if(bio){
    user.bio = bio;
  }

  await user.save();


  res.status(200).json(user);

}

const getUserID = async (req , res) => {

  const { id } = req.params;

  try{
    const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password");
    res.status(200).json(user);

  }catch(e){
      res.status(404).json({error: [" Esse usuário não existe !"]})
    
  }

}

module.exports = {
  register,
  login,
  getUserProfile,
  update,
  getUserID
};
