import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// styles
import './Navbar.css'

// icons

import { FcSearch } from 'react-icons/fc'

// redux

import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../slices/authSlice'


// navigate
import { useNavigate } from 'react-router-dom'


export const Navbar = () => {


  const { authUser } = useAuth();
  const { user } = useSelector((auth) => auth.auth)

 
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const[query , setQuery] = useState("");


  function handleSubmit(){
    setQuery("")

    if(query){
      return navigate(`/search?q=${query}`)
    }

  
  }

  function handleLogout(){
    dispatch(logout())
    dispatch(reset())

    navigate(`/login`)
  }




  return (
    <>
    {authUser === false && (
      <section className='navbar'>
      <Link  className='link' to="/"><h2 className='title'> ReactGram </h2></Link>
      <div className='search'>
       <span className='search-bar'>  <input type="search" value={query} placeholder='busque por algo' onChange={(e) => setQuery(e.target.value)}/>  <FcSearch onClick={handleSubmit} /></span>
      </div>
      <div className='links'>
        <Link className='link' to="/login"> Login</Link>
        <Link className='link' to="/register"> Register </Link>
      </div>
    </section>
    )}

    {authUser && (
         <section  className='navbar'>
         <Link  className='link' to="/"><h2 className='title'> ReactGram </h2></Link>
         <div className='search'>
          <span className='search-bar'>  <input type="search" value={query} placeholder='busque por algo' onChange={(e) => setQuery(e.target.value)}/>  <FcSearch onClick={handleSubmit} /></span>
         </div>
         <div className='links-logout'>
        <Link className='link' to="/"> Home </Link>
        <Link className='link' to={`/profile`}> Configurações  </Link>
        <Link className='link' to={`/perfil/${user._id}`}> Perfil </Link>
        <button className='btn-logout' onClick={handleLogout}> Sair </button>
      </div>
         </section>
    )}


    </>
    
    
  )
}
