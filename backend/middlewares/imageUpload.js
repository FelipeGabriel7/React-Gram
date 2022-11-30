const multer = require("multer");
const path = require("path");

// Destination
const imageDestination = multer.diskStorage({
  destination: function(req , file , cb){

    let paste = "";

    if(req.baseUrl.includes("users")){
      paste = "users"
    }else if(req.baseUrl.includes("photos")){
      paste = "photos"
    }

    cb(null , `uploads/${paste}/`)

  },

  filename: function(req , file , cb){

    cb(null , Date.now() + path.extname(file.originalname))

  }
})

const imgUpload = multer({
  storage: imageDestination,
  fileFilter(req , file , cb){
    if(!file.originalname.match(/\.(png|jpg)$/)){
      return cb(new Error(" Envie apenas .png ou .jpg "))
    }

    cb(undefined , true)
  }
})


module.exports = { imgUpload } 