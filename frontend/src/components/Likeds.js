import React from 'react'
import { FcLike } from 'react-icons/fc'
import { BsHeart } from 'react-icons/bs'

import './Liked.css'


export const Likeds = ({ photo, user, handleLike }) => {

  function handleInfo(){
    return alert(' Voce pode curtir apenas uma vez ')
  }



  return (
    <div className='like'>
        <>
          {photo.likes && user && (
            <>
              {photo.likes.includes(user._id) ? ( <FcLike onClick={handleInfo}/>)  : ( <BsHeart onClick={() => handleLike(photo)} /> ) }
              <p> {photo.likes.length} likes</p>
            </>
          )}
        </>
    </div>
  )
}
