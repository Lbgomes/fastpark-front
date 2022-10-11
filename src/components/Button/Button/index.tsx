import React from 'react'

import * as S from './styled'

interface ButtonProps extends React.HTMLAttributes<Element> {
  children: React.ReactNode

  styleButton?: string
  type?: 'button' | 'submit' | 'reset' | undefined
}

function Button({ children, type, ...props }: ButtonProps) {
  return (
    <S.Container type={type} {...props}>
      {children}
    </S.Container>
  )
}

export default Button
