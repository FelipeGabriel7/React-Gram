import React from 'react'
import './PhotoItem.css'

import { uploads } from '../utils/config'
import { Link } from 'react-router-dom'


export const PhotoItem = ({ photo }) => {
  return (
    <div className='photo-item'>
      {photo.image && (
        <div className='photo-image'>
          <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
        </div>
      )}
      <h3 className='title'> Titulo :  {photo.title} </h3>
      <p className='public'> Publicada (o) por: <Link style={{ textDecoration: 'none', color: '#fff' }} to={`/users/${photo.userId}`}> {photo.userName} </Link></p>
    </div>
  )
}
