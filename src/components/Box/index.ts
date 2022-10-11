import styled from 'styled-components'

interface IBoxProps {
  margin?: string
  padding?: string
}

const Box = styled.div<IBoxProps>`
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
`

export default Box
