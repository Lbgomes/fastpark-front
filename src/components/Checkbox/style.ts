import styled, { css, DefaultTheme } from 'styled-components'

type ContainerProps = {
  checked: boolean
}

export const Wrapper = styled.label`
  position: relative;

  & input {
    height: 0;
    opacity: 0;
    width: 0;
  }
`

export const Container = styled.div<ContainerProps>`
  ${({ theme, checked }) => css`
    background-color: transparent;
    border: 1px solid ${theme.colors.neutral};
    border-radius: 0.4rem;
    height: 1.6rem;
    position: absolute;
    left: 0;
    top: 0;
    width: 1.6rem;

    &::before {
      background-color: ${checked ? theme.colors.primary : 'transparent'};
      border: none;
      border-radius: 50%;
      content: '';
      height: 0.8rem;
      left: 0.3rem;
      position: absolute;
      top: 0.3rem;
      transition: all 150ms ease-out;
      width: 0.8rem;
    }
  `}
`
