import React from 'react'

export const Message = ({ name  , type}) => {
  return (
    <>
      {type === "error" && (
          <p className='error'> {name} </p>
      )}

      {type === "success" && (
          <p className='sucess'> {name} </p>
      )}
    </>
  )
}
