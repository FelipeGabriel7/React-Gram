import React from 'react'

import { Message } from '../../components/Message'
import { Link, useNavigate } from 'react-router-dom'



import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { allPhotos, likedPhotos } from '../../slices/photoSlice'
import { resetMessage } from '../../slices/photoSlice'
import { PhotoItem } from '../../components/PhotoItem'
import { Likeds } from '../../components/Likeds'
import { BsEyeFill } from 'react-icons/bs'

import './Home.css'

export const Home = () => {

  const dispatch = useDispatch()
  const { photos, loading, error, message } = useSelector((state) => state.photos)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(allPhotos())
  }, [dispatch])

  function handleLike(photo) {
    dispatch(likedPhotos(photo._id))

    setTimeout(() => {
      window.location.reload()
    }, 800);


    setTimeout(() => {
      dispatch(resetMessage())
    }, 2500)
  }


  function handleNavigate(id){
    
    setTimeout(() => {
      navigate(`/photos/${id}`)
    }, 350)

  }


  return (
    <div>
      {error && <Message type="error" name={error} />}
      {message && <Message type="success" name={message} />}
      <h2 className='title-home'> Confira Algumas Fotos: </h2>
      {loading && <p> Carregando... </p>}

      {photos.length <= 0 && (
        <p> Ainda não foi publicada nenhuma foto. </p>
      )}

      {photos && photos.map(photo => (
        <div key={photo._id} className="photos-home">
          <PhotoItem photo={photo} />
          <Likeds photo={photo} user={user} handleLike={handleLike} />
          <div className="link-and-comments">
            <p> Comentários ({photo.comments.length}) </p>
            <Link style={{color: '#fff'}} to={`/photos/${photo._id}`}> <BsEyeFill /> </Link>
            <button className="btn-home" onClick={() => handleNavigate(photo._id)}> Ver Mais </button>
          </div>
        </div>
      ))}
    </div>
  )
}
