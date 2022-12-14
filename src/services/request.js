import axios from 'axios'

export const signIn = async (data) => {
  const createContentDataResponse = await (
    await axios.post('http://localhost:6060/auth/entrar', data)
  ).data
  return createContentDataResponse
}

export const SignUp = async (data) => {
  const createContentDataResponse = await axios.post(
    'http://localhost:6060/auth/cadastrar',
    data
  )

  return createContentDataResponse
}
