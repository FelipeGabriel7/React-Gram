const express = require("express");
const router = express.Router();

// Controllers
const {
  insertPhoto,
  removePhoto,
  allPhotos,
  userPhotos,
  PhotoId,
  UpdatePhoto,
  Like,
  CommentsPhotos,
  searchPhoto,
} = require("../controllers/PhotosController");

// Middlewares
const {
  photoInsertValidation,
  photoVeriFy,
  commentValidation,
} = require("../middlewares/photoValidate");
const auth = require("../middlewares/Autentication");
const validate = require("../middlewares/handleValidate");
const { imgUpload } = require("../middlewares/imageUpload");

// Routers

router.post(
  "/",
  auth,
  imgUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);

router.delete("/:id", auth, removePhoto);
router.get("/", allPhotos);
router.get("/user/:id", auth, userPhotos);
router.get("/search", auth, searchPhoto);
router.get("/:id", auth, PhotoId);
router.put("/:id", auth, photoVeriFy(), validate, UpdatePhoto);
router.put("/like/:id", auth, Like);

router.put(
  "/comments/:id",
  auth,
  commentValidation(),
  validate,
  CommentsPhotos
);

module.exports = router;
