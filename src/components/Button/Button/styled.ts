import styled, { css, DefaultTheme } from 'styled-components'

type ContainerProps = {
  styleButton?: string
}

const containerMapper = {
  default: (theme: DefaultTheme) => css`
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius};
    color: ${theme.colors.white};
    font-size: clamp(0.8rem, 2vw, 1.6rem);
    font-weight: ${theme.font.bold};
    padding: 1.5rem 2rem;
    min-width: 21.6rem;
  `,
  danger: (theme: DefaultTheme) => css`
    align-items: center;
    background: ${theme.colors.danger};
    border-radius: 0.4rem;
    display: flex;
    justify-content: center;
    height: 2.8rem;
    width: 2.8rem;

    & svg path {
      fill: ${theme.colors.black};
    }

    & svg {
      width: 12px;
    }
  `,
  edit: (theme: DefaultTheme) => css`
    align-items: center;
    background: ${theme.colors.primary};
    border-radius: 0.4rem;
    display: flex;
    justify-content: center;
    height: 2.8rem;
    width: 2.8rem;

    & svg path {
      fill: ${theme.colors.black};
    }

    & svg {
      width: 12px;
    }
  `,
  attencion: (theme: DefaultTheme) => css`
    align-items: center;
    background: #d2bd00;
    border-radius: 0.4rem;
    display: flex;
    justify-content: center;
    height: 2.8rem;
    width: 2.8rem;

    & svg path {
      fill: ${theme.colors.black};
    }

    & svg {
      width: 12px;
    }
  `,
  secondButton: (theme: DefaultTheme) => css`
    background: transparent;
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.borderRadius};
    color: ${theme.colors.primary};
    font-size: clamp(0.8rem, 2vw, 1.6rem);
    font-weight: ${theme.font.bold};
    padding: 1.5rem 2rem;
    min-width: 14.9rem;
  `
}

export const Container = styled.button.attrs((props: ContainerProps) => ({
  styleButton: props.styleButton
}))`
  ${({ theme, styleButton = 'default' }) => css`
    border: none;
    cursor: pointer;
    outline: none;
    text-transform: uppercase;

    & a.csv-download-button {
      color: ${theme.colors.white};
      display: flex;
      justify-content: center;
      text-decoration: none;
      text-transform: uppercase;
    }

    & span {
      font-weight: ${theme.font.bold};
      margin-left: 0.8rem;
      text-transform: uppercase;
    }

    ${!!styleButton &&
    (containerMapper as Record<string, any | undefined>)[styleButton](theme)}
  `}
`

export const Button = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    border-radius: 0.8rem;
    color: ${theme.colors.white};
    font-weight: ${theme.font.bold};
  `}

  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  outline: none;
  padding: 1.5rem 2rem;

  &.danger {
    background: var(--danger-color);
  }

  &.success {
    background: var(--success-color);
  }

  &.info {
    background: var(--info-color);
  }

  &.white {
    background: white;
    color: #444;
    border: solid 1px var(--default-dark-gray);
  }

  &.warning {
    background: #ffc107;
    color: black;
  }

  &.small {
    padding: 3px 6px;
  }
`
