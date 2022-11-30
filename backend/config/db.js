const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const keyUser = process.env.PASSWORD_KEY;

async function connectDB(){

  try{

    const dBCo = await mongoose.connect(`mongodb+srv://${dbUser}:${keyUser}@cluster0.lm2sd15.mongodb.net/?retryWrites=true&w=majority`);
    console.log(' Conectou ao banco ');

    return dBCo;

  }catch(e){
    console.log(e)
  }

}

connectDB();

module.exports = connectDB