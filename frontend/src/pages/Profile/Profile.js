import React from 'react'

// styles
import './Profile.css'

// Hooks
import { useEffect , useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';

// Redux
import { infoUpdate, infoUser , resetMessage } from '../../slices/profileSlice';

// message
import { Message } from '../../components/Message'
import { uploads } from '../../utils/config';


export const Profile = () => {

  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [image , setImage] = useState("")
  const [previewImage , setPreviewImage] = useState("")
  const [bio , setBio] = useState("")


  const dispatch = useDispatch()
  const { user: userProfile , error , message , loading} = useSelector(state => state.user)


  useEffect(() => {

    if(userProfile){
      setName(userProfile.name)
      setEmail(userProfile.email)
      setBio(userProfile.bio)
      setPassword(userProfile.password)
      setImage(userProfile.profileImage)
    }


  }, [userProfile])


  useEffect(() => {
    dispatch(infoUser())
  } , [dispatch])



  async function handleSubmit(e) {
    e.preventDefault();

    const updateUser = {
      name
    }

    if(image){
      updateUser.profileImage = previewImage
    }

    if(bio){
      updateUser.bio = bio
    }

    if(password){
      updateUser.password = password
    }

    const formData = new FormData()

    const userFormData = Object.keys(updateUser).forEach(key => formData.append(key , updateUser[key]))

    formData.append("userProfile" , userFormData)

    await dispatch(infoUpdate(formData))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2500)

  }

  function handleFile(e){

    const imageT = e.target.files[0]
    setPreviewImage(imageT)
    setImage(imageT)

  }

  return (
    <div className='edit-perfil'>
      <h1 className='title-perfil'> Altere os Dados do seu perfil: </h1>
      <p className='subtitle-perfil'> Adicione uma imagem e conte mais sobre você </p>

      {error && <Message type="error" name={error} />}
      {message && <Message type="success" name={message} />}
      <form onSubmit={handleSubmit} className="form-perfil">
        <label>
          {(userProfile.profileImage  || previewImage) && (
            <div className="perfil-image">
                <img  className="image-perfil-circle"  src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${userProfile.profileImage}` } alt={userProfile.name}/>
            </div>
          )}
          <span> Foto de perfil </span>
          <input type="file" onChange={handleFile} name="profileImage" />
        </label>
        <label>
          Bio
          <textarea name="bio" id="bio" cols="10" rows="6" value={bio || ""} onChange={(e) => setBio(e.target.value)}></textarea>
        </label>
        <label>
          Nome
          <input type="text" placeholder="edite seu usuário" value={name || ""} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input type="text" placeholder="email" disabled value={email || ""}/>
        </label>
        <label>
          <span> Altere sua senha: </span>
          <input type="password" placeholder='alterar senha' value={password || ""} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        {!loading && (
           <button type="submit" className='btn-submit'> Atualizar </button>
        )}

        {loading && ( 
           <button type="submit" disabled className='btn-submit'> Aguarde </button>
        )}
      </form>
    </div>
  )
}
