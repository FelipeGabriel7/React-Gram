import React from "react";

// components
import { Message } from "../../components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";

// hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploads } from "../../utils/config";
import { BiCog } from "react-icons/bi";

//styles
import "./Perfil.css";

//icons
import { FcLike } from "react-icons/fc";
import { TbMessageDots, TbBrandTelegram } from "react-icons/tb";
import { MdSaveAlt } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  BsEyeFill,
  BsInfoCircleFill,
  BsPencilFill,
  BsTrashFill,
} from "react-icons/bs";

// redux
import { userDetails } from "../../slices/profileSlice";
import {
  photosPublish,
  resetMessage,
  photosUser,
  photosDelete,
  photosUpdate,
  likedPhotos
} from "../../slices/photoSlice";

export const Perfil = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const[editImage , setEditImage] = useState("")
  const[editTitle , setEditTitle] = useState("")
  const[editId , setEditId] = useState("")

  const navigate = useNavigate()
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user: userAuth } = useSelector((state) => state.auth);
  const { user, loading, error } = useSelector((state) => state.user);
  const {
    photos,
    loading: loadingPhotos,
    error: errorPhotos,
    message: messagePhoto,
  } = useSelector((state) => state.photos);

  console.log(photos);

  const photoReference = useRef();
  const editPhotoReference = useRef();

  useEffect(() => {
    dispatch(userDetails(id));
    dispatch(photosUser(id));

  }, [dispatch, id]);


  function handlePhoto(id){
    navigate(`/photos/${id}`)
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(title === "" || image === ""){
      return alert(' Informe um valor válido ');
    }

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    const photoForm = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoForm);

    dispatch(photosPublish(formData));

    setTitle("");

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  function handleFile(e) {
    const imageT = e.target.files[0];
    setImage(imageT);
  }


  function handleRemove(id){

    dispatch(photosDelete(id))

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }


  function handleEdit(e){
    e.preventDefault();

    const newPhoto = {
      title: editTitle,
      id: editId,
    }

    dispatch(photosUpdate(newPhoto))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000);

  }

  function formAndEdit(){
    photoReference.current.classList.toggle("visible");
    editPhotoReference.current.classList.toggle("visible");
  }

  function formEdit(photo){
    if(editPhotoReference.current.classList.contains("visible")){
      formAndEdit();
    }

    setEditTitle(photo.title)
    setEditId(photo._id)
    setEditImage(photo.image)
  }

  function handleCanceledEdit(e){
    e.preventDefault()
    formAndEdit()
  }


  function handleLike(photo){
    dispatch(likedPhotos(photo._id))
  }

  return (
    <>
      {userAuth && (
        <>
          {loading && <p className="load"> </p>}
          {error && <Message name={error} type="error" />}

          <div className="headers-profile">
            <div className="image-profile">
              {user.profileImage && (
                <img
                  src={`${uploads}/users/${user.profileImage}`}
                  alt={user.name}
                />
              )}
            </div>
            <div className="items-profile">
              <span className="items-name">
                <p> {user.name} </p>
                <p className="item-bio"> {user.bio} </p>
                <Link className="icon" to="/profile">
                  {" "}
                  <BiCog />{" "}
                </Link>
              </span>
              <span className="items-link"></span>
            </div>
          </div>
        </>
      )}
      {id === userAuth._id && (
        <>
          {errorPhotos && <Message name={errorPhotos} type="error" />}
          

          <div className="form-add-photo" ref={photoReference}>
            <p> Adicione suas fotos e compartilhe seus momentos: </p>
            <form onSubmit={handleSubmit} className="form-photo">
              <label>
                <span> TItulo da foto: </span>
                <input
                  type="text"
                  placeholder="Insira o titulo"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                <span> Imagem </span>
                <input
                  type="file"
                  className="iptn-image"
                  required
                  onChange={handleFile}
                />
              </label>
              {!loadingPhotos && (
                <input type="submit" value="Adicionar" className="btn-photo" />
              )}

              {loadingPhotos && (
                <input
                  type="submit"
                  value="Aguarde..."
                  disabled
                  className="btn-photo"
                />
              )}
            </form>
          </div>
          
          <div className="edit-photo-form visible" ref={editPhotoReference}>
          <span> Editando: </span>
                  {editImage && (
                    <img style={{width: '20%' , borderRadius: '0.5rem', margin: '0 auto'}} src={`${uploads}/photos/${editImage}`} alt={editTitle}/>
                  )}
              <form className="edit-photo" onSubmit={handleEdit}>
                    <input type="text" value={editTitle} onChange={(e) =>  setEditTitle(e.target.value)}/>
                    <br/>
                    <input className="btn-photo-edit" type="submit" value="Editar"/>
                    &nbsp;
                    <button className="btn-photo-cancel" onClick={handleCanceledEdit}> Cancelar Edição </button>
              </form>
          </div>
        </>
      )}

      <div className="container-photos">
      {messagePhoto && <Message name={messagePhoto} type="success" />}
        <h2> Suas Fotos publicadas: </h2>
        <div className="photos-content">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
              
              <div className="btn-photo-link">
              <BiDotsHorizontalRounded className="icon" onClick={() => handlePhoto(photo._id)}/>
              </div>

                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}

                {id === userAuth._id ? (
                  <>
                    <div className="icons-photo">
                      <BsTrashFill className="icon" onClick={() => handleRemove(photo._id)}/>
                      <BsPencilFill className="icon" onClick={() => formEdit(photo)} />
                      <BsEyeFill className="icon" onClick={() => handlePhoto(photo._id)} />
                      <BsInfoCircleFill className="icon" onClick={() => handlePhoto(photo._id)} />
                    </div>
                  </>
                ) : (
                  <div className="icons-photo">
                    <FcLike className="icon" onClick={() => handleLike(photo)}/>
                    <TbMessageDots className="icon" />
                    <TbBrandTelegram className="icon" />
                    <MdSaveAlt className="icon" />
                  </div>
                )}

                <p> {photo.title} </p>
              </div>
            ))}

          {photos.length === 0 && <p> Não há fotos publicadas </p>}
        </div>
      </div>
    </>
  );
};
