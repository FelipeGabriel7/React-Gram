import React from 'react'

import { useEffect , useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Message } from '../../components/Message';
import { commentsPhoto, likedPhotos, photosOne, resetMessage } from '../../slices/photoSlice';
import { PhotoItem } from '../../components/PhotoItem';
import { Likeds } from '../../components/Likeds';
import { Comments } from '../../components/Comments';

import './Photo.css'

export const Photo = () => {
  const [chat, setChat] = useState(false);
  const [txtComment, setTxtComment] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)
  const { photo, loading, error, message} = useSelector((state) => state.photos)

  console.log(photo)

  useEffect(() => {
    dispatch(photosOne(id))
  }, [dispatch, id])

  function handleLike(){
    dispatch(likedPhotos(photo._id))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2200);
  }


  function handleComment(){

    const commentData = {
      comment: txtComment,
      id: photo._id
    }


    dispatch(commentsPhoto(commentData))

    setTxtComment("")


    setTimeout(() => {
      dispatch((resetMessage()))
    } , 2000)

  }

  return (
    <>
      <div style={{marginTop  : '2em'}} >
        <PhotoItem photo={photo}/>
        <Likeds photo={photo} user={user} handleLike={handleLike}/>
        <Comments handleComment={handleComment} photo={photo}  chat={chat} setChat={setChat} txtComment={txtComment} setTxtComment={setTxtComment} message={message}/>
        {message && <Message type="sucess" name={message}/> }
        {error && <Message type="error" name={error} />}
        {loading && <p> Carregando .... </p>}
        
      </div>
    </>
  )
}
