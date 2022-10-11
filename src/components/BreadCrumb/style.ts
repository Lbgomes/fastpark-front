import styled, { css } from 'styled-components'

const BreadCrumbContainer = styled.div`
  margin-bottom: 2.5rem;

  & > :not(:first-child) {
    &::before {
      content: ' / ';
      margin: 0 0.3rem;
    }
  }

  ${({ theme }) => css`
    a,
    span {
      text-decoration: none;
      color: ${theme.colors.primary};
      font-size: ${theme.sizes.medium};
    }
  `}
`

export { BreadCrumbContainer }
