import React from 'react'

import { Container, LoadingContent } from './styles'

const Loading: React.FC = () => (
  <Container id="loading">
    <LoadingContent>
      <div className="spinner" />
      <div className="text">Carregando...</div>
    </LoadingContent>
  </Container>
)

export default Loading
