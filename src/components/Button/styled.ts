import styled, { css, DefaultTheme } from 'styled-components'

type ContainerProps = {
  styleButton?:
    | 'default'
    | 'iconButton'
    | 'secondButton'
    | 'unlinkButton'
    | 'transparentIconButton'
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
  secondButton: (theme: DefaultTheme) => css`
    background: transparent;
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.borderRadius};
    color: ${theme.colors.primary};
    font-size: clamp(0.8rem, 2vw, 1.6rem);
    font-weight: ${theme.font.bold};
    padding: 1.5rem 2rem;
    min-width: 18rem;
  `,

  iconButton: (theme: DefaultTheme) => css`
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius};
    color: ${theme.colors.white};
    font-size: clamp(0.8rem, 2vw, 1.6rem);
    font-weight: ${theme.font.bold};
    padding: 1.5rem 2rem;
    min-width: 21.6rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  `,
  transparentIconButton: (theme: DefaultTheme) => css`
    background: transparent;
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    font-size: clamp(0.8rem, 2vw, 1.6rem);
    font-weight: ${theme.font.bold};
    padding: 1.5rem 2rem;
    min-width: 21.6rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  `,
  unlinkButton: (theme: DefaultTheme) => css`
    background: ${theme.colors.black};
    border-radius: ${theme.borderRadius};
    color: red;
    font-size: clamp(0.8rem, 2vw, 1.6rem);
    font-weight: ${theme.font.bold};
    padding: 1.5rem 2rem;
    min-width: 18rem;
    height: 3rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  `
}

export const Button = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius};
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
