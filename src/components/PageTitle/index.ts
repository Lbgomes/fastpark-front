import styled, { css } from 'styled-components'

const PageTitle = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.sizes.xlarge};
    margin-bottom: 3rem;
    font-weight: ${theme.font.bold};
    border-bottom: solid 1px ${theme.colors.white};
    color: ${theme.colors.white};
    padding-bottom: 1rem;
  `}
`

export default PageTitle
