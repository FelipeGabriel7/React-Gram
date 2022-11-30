import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Auth.css'

import { Message } from '../../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { LoginIsUser , reset  } from '../../slices/authSlice';


export const Login = () => {

  const[password , setPassword] = useState("");
  const[email , setEmail] = useState("");

  const { loading , error } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
 

  function handleSubmit(e){
    e.preventDefault();

    const loginUser = {
      email,
      password,
    }


    dispatch(LoginIsUser(loginUser))

    setPassword("")
    setEmail("")
    
  }

  useEffect(() => {
    dispatch(reset())
  } , [dispatch]);

  return (
    <div className='container-form'>
      <h3> Faça Login </h3>
      <p> Para se logar é simples basta inserir usuário e senha.</p>

      {error && <Message type="error" name={error}/>}

      <form className='form' onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>
        <label>
          Senha
          <input type="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        {!loading && (
          <input className='btn' type="submit" value="Entrar" onClick={handleSubmit}/>
        )} 

        {loading && (
          <input className='btn' type="submit" value="Aguarde..."/>
        )}
        <p> Não possui conta ? <Link style={{textDecoration: 'none' , color: '#45f'}} to="/register"> Cadastre-se </Link></p>
      </form>

  
    </div>
  )
}
