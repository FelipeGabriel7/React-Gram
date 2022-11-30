const express = require("express")
const router = express.Router();

// Controller 
const { register , login , getUserProfile , update, getUserID } = require("../controllers/UserController")

// middlewares 
const validate = require("../middlewares/handleValidate")
const auth = require("../middlewares/Autentication")
const { validateUserCreate , validateUser, validateUpdateUser } = require("../middlewares/userValidate");
const { imgUpload }  = require("../middlewares/imageUpload");

// Routes
router.post("/register" , validateUserCreate() ,  validate , register);
router.post("/login" , validateUser() , validate , login);

// Get
router.get("/user" , auth ,  getUserProfile );
router.get("/:id" , getUserID)

// Put
router.put("/" , auth , validateUpdateUser() , validate , imgUpload.single("profileImage") , update);


module.exports = router;