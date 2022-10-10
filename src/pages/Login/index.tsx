import React, { useState } from 'react';
import { signIn } from '../../services/request';
import * as S from './styles'
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        const data = {
            "email": "Miqueis@Miqueias.com",
            "password": "1234567"
        }
        await signIn(data)
    }

  return (
    <S.Container>
      <S.LoginContainer>
        <S.LoginBlock>
          <S.LoginTitle>Que bom te ver aqui!</S.LoginTitle>
          <S.LoginDescription>
            Bem vinde à plataforma administrativa da SJTMED PLAY
          </S.LoginDescription>
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