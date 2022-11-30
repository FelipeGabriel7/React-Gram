import { api , configureMethod } from "../utils/config";


export default async function profileService(data , token){

  const method = configureMethod("GET" , data , token)

  try{

    const res = await fetch(api+'users/user' , method)
    .then(res => res.json())
    .catch(e => console.log(new Error (e)))

    return res; 

  }catch(e){
    console.log(e)
  }
}

export async function profileUpdate(data , token) {

  const method = configureMethod("PUT" , data , token , true)

  try{

    const res = await fetch(api+"users" , method)
    .then(res => res.json())
    .catch(e => console.log(new Error(e)))

    return res;

  }catch(e){
    console.log(e)
  }

}


export async function getUserDetails(id){

  const method = configureMethod("GET")
  
  try{

    const res = await fetch(api + 'users/' + id , method)
    .then(res => res.json())
    .catch(e => e)

    return res;

  }catch(e){
    console.log(e)
  }
}