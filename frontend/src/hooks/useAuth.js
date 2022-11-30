import { useState , useEffect  } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {

  const[authUser , setAuthUser] = useState(false)
  const[loading , setLoading] = useState(true)

  const { user } = useSelector((auth) => auth.auth)


  useEffect(() => {

    if(user){
      setAuthUser(true)
    }else{
      setAuthUser(false)
    }

    setLoading(false)

  } , [user])


  return { authUser , loading}


}
