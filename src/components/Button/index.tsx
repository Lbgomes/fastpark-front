import React from 'react'

import * as S from './styled'

interface ButtonProps extends React.HTMLAttributes<Element> {
  children: React.ReactNode
  styleButton?:
    | 'default'
    | 'iconButton'
    | 'secondButton'
    | 'unlinkButton'
    | 'transparentIconButton'
  type?: 'button' | 'submit' | 'reset' | undefined
}

function Button({
  children,
  type,
  styleButton = 'default',
  ...props
}: ButtonProps) {
  return (
    <S.Container type={type} {...props} styleButton={styleButton}>
      {children}
    </S.Container>
  )
}

export default Button
