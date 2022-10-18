import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserStore } from '../../GlobalState';
import { signIn } from '../../services/request';
import * as S from './styles'
import LogoFastPark from '../../assets/LogoFastPark.svg'

export default function Login() {

  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authResponse, setAuthResponse] = useState(false)
  const userStore = useUserStore()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = {
      "email": email,
      "password": password
    }
    const res = await signIn(data)
    console.log('Teste auth1', userStore.Autenticated)
    setAuthResponse(res.autenticado)
  }

  const update = () => {
    userStore.setAutenticated()
  }

  useEffect(() => {
    console.log('Teste res', authResponse)
    if (authResponse) {
      update()
    }
  }, [authResponse])

  useEffect(() => {
    if (userStore.Autenticated) {
      history.push('/home')
    }
  }, [userStore.Autenticated])

  return (
    <S.Container>
      <S.LoginContainer>
        <S.LoginBlock>
          <S.LoginTitle>Que bom te ver aqui!</S.LoginTitle>
          <S.Logo
            src={LogoFastPark}
            className='Logo'
          />
          <S.LoginForm onSubmit={handleLogin}>
            <S.LoginLabel>
              Login
              <S.LoginInput
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </S.LoginLabel>
            <S.LoginLabel>
              Senha
              <S.LoginInput
                type="password"
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </S.LoginLabel>
            <S.LoginInput type="submit" value="Entrar" />
          </S.LoginForm>
        </S.LoginBlock>
      </S.LoginContainer>
    </S.Container>
  );
}