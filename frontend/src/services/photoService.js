import { api , configureMethod} from '../utils/config'

export async function photoService(data , token){

  const method = configureMethod("POST" , data , token , true)

  try {

    const res = await fetch(api+'photos' , method)
                  .then((res) => res.json())
                  .catch(e => console.log(new Error (e)))
      
    return res;

    
  } catch (error) {
    console.log(error)
  }

}

export async function getPhotosService(id , token){

  const method = configureMethod("GET" , null , token)


  try{

    const res = await fetch(api+'photos/user/' + id , method)

    .then(res => res.json())
    .catch(e => console.log(e))

    return res;

  }catch(e){
    console.log(e)
  }

}

export async function deletePhotoService(id , token){
  const method = configureMethod("DELETE" , null , token)

  try{
    
    const res = await fetch(api + 'photos/' + id , method)
          .then(res => res.json())
          .catch(e => console.log(new Error (e)))

    return res;

  }catch(e){
    console.log(e)
  }

}

export async function editPhotoService(data , id , token){

  const method = configureMethod("PUT", data , token)

  try{

    const res = await fetch(api + 'photos/' + id , method)
          .then(res => res.json())
          .catch(e => console.log(new Error (e)))


    return res;


  }catch(e){
    console.log(e)
  }

}

export async function getPhoto(id , token){
  const method = configureMethod("GET" , null , token)

  try{

    const res = await fetch(api + 'photos/'+ id , method)
        .then(res => res.json())
        .catch(e => console.log(new Error(e)))

    return res;

  }catch(e){
    console.log(e)
  }

}

export async function likedPhoto(id , token){
  const method = configureMethod("PUT" , null , token)

  try{

    const res = await fetch(api + 'photos/like/'+id , method)
        .then(res => res.json())
        .catch(e => console.log(new Error(e)))

  return res;

  }catch(e){
    console.log(e)
  }
}

export async function commentsPhotos(data , id , token){

  const method = configureMethod("PUT" , data , token)

  try{

    const res = await fetch(api + "photos/comments/" + id , method)
            .then(res => res.json())
            .catch(e => console.log(new Error(e)))


    return res;
  }catch(e){
    console.log(e)
  }

}

export async function getAllPhotos(){

  const method = configureMethod("GET")

  try{

    const res = await fetch(api + 'photos' , method)
              .then(res => res.json())
              .catch(e => console.log(new Error (e)))


    return res;

  }catch(e){
    console.log(e)
  }

}

export async function searchPhoto(data , token){

  const method = configureMethod("GET" , null , token)

  try{

    const res = await fetch(api + 'photos/search?q=' + data , method)
        .then(res => res.json())
        .catch(e => console.log(new Error(e)))

    return res;


  }catch(e){
    console.log(e)
  }

}