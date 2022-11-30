require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

// middlewares
app.use(cors({credentials: true , origin: 'http://localhost:3000'}))

// Upload directory
app.use("/uploads" , express.static(path.join(__dirname , "/uploads")))

// DB connection
require("./config/db.js");

// config JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//routes
const router = require("./routes/router")
app.use(router)


app.listen(port , function(){
  console.log(' APP RODANDO NA PORTA : ' + port)
})

