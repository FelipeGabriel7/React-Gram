const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  image: String,
  title: String,
  likes: Array,
  photoId: mongoose.ObjectId,
  comments: Array,
  userId: mongoose.ObjectId,
  userName: String,

}, {
  timestamps: true,
}
)

const Photo = mongoose.model("Photos" , postSchema)

module.exports = Photo;