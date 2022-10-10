
import axios from "axios"

export const signIn = async (data) => {
  console.log(data)
    const createContentDataResponse = (await axios.get('http://localhost:3000/api/entrar', data))
    console.log(createContentDataResponse)
    return createContentDataResponse
  }

  export const SignUp = async (data) => {
  
    const createContentDataResponse = await axios.post('http://localhost:3000/api/cadastrar', data)
    
    return createContentDataResponse
  }