
import axios from "axios"

export const signIn = async (data) => {
  console.log(data)
    const createContentDataResponse = await axios.post('http://localhost:6060/auth/entrar', data)
    console.log(createContentDataResponse)
    return createContentDataResponse
  }

  export const SignUp = async (data) => {
  
    const createContentDataResponse = await axios.post('http://localhost:6060/auth/cadastrar', data)
    
    return createContentDataResponse
  }