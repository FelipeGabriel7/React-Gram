const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require("../models/User")
const multer = require("multer");

// Insert

async function insertPhoto(req, res) {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id)

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  })


  if (!newPhoto) {
    res.status(422).json({ error: ["Algo deu errado tente novamente"] })
    return;
  }

  res.status(201).json(newPhoto)

}

// Remove photo db

async function removePhoto(req, res) {

  const { id } = req.params;
  const user = req.user;

  const photo = await Photo.findById(mongoose.Types.ObjectId(id))

  try {


    if (!photo) {
      res.status(404).json({ error: [" essa foto não existe"] })
      return;
    }

    if (!photo.userId.equals(user._id)) {
      res.status(422).json({ error: [" Algo deu errado , tente novamente "] })
      return;
    }

    await Photo.findByIdAndDelete(photo._id)
    res.status(200).json({ id: photo._id, message: " Foto deletada com sucesso !" })


  } catch (e) {

    console.log(e)
    res.status(404).json({ error: [" Essa foto não existe "] })

  }
}

// get all photos

async function allPhotos(req, res) {

  const photos = await Photo.find({}).sort([["createAt", -1]]).exec();
  res.status(200).json(photos);

}


// get User Photos

async function userPhotos(req, res) {

  const { id } = req.params;
  const photos = await Photo.find({ userId: id }).sort([["createAt", -1]]).exec();

  res.status(200).json(photos)

}

// get photos Id

async function PhotoId(req, res) {


  try {


    const { id } = req.params;

    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    if (!photo) {
      return res.status(422).json({ error: [" Essa foto não existe ! "] })
    }

    res.status(200).json(photo)

  } catch (e) {

    if (!photo) {
      res.status(422).json({ error: [" Essa foto não existe ! "] })
      return
    }

    console.log(e)
    res.status(422).json({ error: [" Desculpe algo deu errado !"] })

  }

}

// Update photo

async function UpdatePhoto(req, res) {

  const { id } = req.params
  const { title } = req.body
  const user = req.user

  const photo = await Photo.findById(id)


  if (!photo) {
    res.status(404).json({ error: [" essa foto não existe !"] })
    return
  }

  if (!photo.userId.equals(user._id)) {
    res.status(422).json({ error: [" Algo deu errado , tente novamente"] })
    return
  }

  if (title) {
    photo.title = title
  }

  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada!" })

}


// Like Potho

async function Like(req, res) {

  const { id } = req.params;
  const user = req.user;
  
  const photo = await Photo.findById(id);

  try{
    if (!photo) {
      return res.status(404).json({ error: [" Foto inexistente"] })
    }
  
    if (photo.likes.includes(user._id)) {
     return res.status(422).json({ error: [" Você já curtiu essa foto."] })
    }
  
    photo.likes.push(user._id)
    await photo.save()
  
    res.status(200).json({ photoId: id, userId: user._id, message: "A foto foi curtida." })
      
  }catch(e){
    console.log(e)
  }


}
// Comments Photos

async function CommentsPhotos(req, res) {

  const { id } = req.params
  const { comment } = req.body

  const reqUser = req.user
  const user = await User.findById(reqUser._id)

  const photo = await Photo.findById(id);


  if (!photo) {
    res.status(404).json({ error: [" Foto inexistente"] })
    return
  }

  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id
  }

  photo.comments.push(userComment)
  photo.save()

  res.status(200).json({
    comment: comment,
    message: "Comentário adicionado com sucesso"
  })

}


// search Image 

async function searchPhoto(req, res) {

  const { q } = req.query;
  const photo = await Photo.find({ title: new RegExp(q, "i") }).exec()

  if (!photo) {
    res.status(404).json({ error: [" Foto inexistente"] })
    return
  }

  return res.status(200).json(photo)


}

module.exports = {
  insertPhoto,
  removePhoto,
  allPhotos,
  userPhotos,
  PhotoId,
  UpdatePhoto,
  Like,
  CommentsPhotos,
  searchPhoto
}