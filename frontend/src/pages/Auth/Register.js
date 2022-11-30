import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


// Redux 
import { register, reset } from '../../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Message } from '../../components/Message';

export const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth)

  function handleSubmit(e) {
    e.preventDefault();


    const user = {
      name,
      email,
      password,
      confirmPassword,
    }

    dispatch(register(user))

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");


  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <>
      <div className='container-form'>
        <h3> Registre-se </h3>
        <p> Venha compartilhar os seus momentos </p>

        {error && <Message type="error" name={error}/>}

        <form className='form' onSubmit={handleSubmit}>
          <label>
            Nome
            <input type="text" placeholder="nome" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Senha
            <input type="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Confirma Senha
            <input type="password" placeholder="confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          {!loading &&   <input className='btn' onClick={handleSubmit} type="submit" value="Cadastrar" />}
          {loading &&   <input className='btn' disabled onClick={handleSubmit} type="submit" value="Aguarde" />}
          <p> Já possui conta ? <Link style={{ textDecoration: 'none', color: '#45f' }} to="/login"> Faça Login </Link></p>
        </form>
      </div>
    </>
  )
}
