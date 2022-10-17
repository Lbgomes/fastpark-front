import * as S from './styles'

export default function Label({ children, ...props }) {
  return <S.LabelInput {...props}>{children}</S.LabelInput>
}
