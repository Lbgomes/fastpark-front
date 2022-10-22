import styled, { css } from 'styled-components'

export const SideBarContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const LogoContainer = styled.div`
  padding: 25px;

  img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
`

export const Menus = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  background-color: #101010;

  > div {
    width: 100%;
    margin-left: 0.5rem;
  }
  div .text {
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
  div .options {
    margin-left: 0.3rem;
  }
  hr {
    width: 20.1rem;
    height: 0px;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    margin: 1.6rem 0px;
  }

  h2 {
    color: #8898aa;
    font-style: normal;
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin: 0rem 0rem 2rem 0.5rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  a,
  button {
    display: flex;
    align-items: center;
    cursor: pointer;
    background: none;
    outline: none;
    border: none;
    color: var(--white);
    font-size: var(--font-small);
    text-decoration: none;
    width: 100%;
    border-radius: 5px;
    padding: 10px 5px;
    transition: all 0.3s;

    span:first-of-type {
      margin-right: 1rem;
      display: flex;
      align-items: center;

      svg {
        width: 1.6rem;
        height: 1.8rem;
      }
    }

    .icon {
      margin-right: 5px;
      width: 1.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--white);
      transition: all 0.3s;
      svg {
        color: var(--white);
        width: 8rem;
        height: 4rem;
      }
    }
    .icon:after {
      color: var();
    }
    .sub-items {
      margin-left: auto;
      transition: transform 0.3s ease;

      &.active {
        transform: rotate(90deg);
      }
    }

    ${({ theme }) => css`
      &:hover .icon svg,
      &.active .icon svg {
        color: ${theme.colors.primary};
      }
      &:hover,
      &.active {
        color: ${theme.colors.primary};
      }
    `}

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`

export const LogoutButton = styled.button`
  margin-bottom: 32px;
`
