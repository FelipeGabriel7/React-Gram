import { api } from '../utils/config'

export async function authService(data){

  try {
    
    const response = await fetch(api + "users/register" , {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "Application/json"
      }
    })
    .then(response => response.json())
    .catch(e => console.log(new Error (e)))

    if(response){
      localStorage.setItem("user" , JSON.stringify(response))
    }

    return response;


  } catch (error) {
    console.log(error)
  }

}

export function logoutUser(){
  setTimeout(() => {
    localStorage.removeItem("user")
  } , 200)
}

export async function loginService(data){

  try{

    const request = await fetch(api + "users/login" , {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "Application/json"
      }
    }).then(request => request.json())
    .catch(e => console.log(new Error(e)))

    if(request._id){
      localStorage.setItem("user" , JSON.stringify(request))
    }

    return request;

  }catch(e){
    console.log(e)
  }


}
