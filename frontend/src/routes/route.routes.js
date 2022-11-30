import React from 'react'
import { BrowserRouter as Container, Routes, Route, Navigate } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Login } from '../pages/Auth/Login'
import { Register } from '../pages/Auth/Register'
import { Home } from '../pages/Home/Home'

// styles
import './routes.css'

// custom Hook
import { useAuth } from '../hooks/useAuth'
import { Perfil } from '../pages/Perfil/Perfil'
import { Profile } from '../pages/Profile/Profile'
import { Photo } from '../pages/Photos/Photo'
import { Search } from '../pages/search/Search'

export const RoutePage = () => {

  const { authUser, loading } = useAuth();

  console.log(authUser)

  if (loading) {
    return <p> Carregando .... </p>
  }


  return (
    <div>
      <Container>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/perfil/:id" element={authUser ? <Perfil /> : <Navigate to="/login" />} />
            <Route path="/photos/:id" element={authUser ? <Photo /> : <Navigate to="/login" />} />
            <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
            <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/search" element={authUser ? <Search /> : <Navigate to="/login" />} />
          </Routes>
          <Footer />
        </div>

      </Container>
    </div>
  )
}
