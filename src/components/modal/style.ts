import styled, { css } from 'styled-components'



const ModalContentContainer = styled.div`
  ${() => css`
    @keyframes fadeIn {
      0% {
        background: rgba(255, 255, 255, 0);
      }
      100% {
        background: rgba(255, 255, 255, 1);
      }
    }

    width: 80%;
    height: auto;
    background: #444444;
    border-radius: 15px;
    animation: fadeIn 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  `}
`

const ModalHeader = styled.div`
  padding: 25px;
  border-bottom: solid 1px white;
  height: 15%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalCloseButton = styled.button`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: solid 1px var(--default-dark-gray);
  background: #d9d9d9;
  outline: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalTitle = styled.h2`
  font-size: 2rem;
  color: var(--default-title-color);
`

const ModalContent = styled.div`
  padding: 15px;
  height: 90%;
  overflow: auto;
`

export {
  ModalContentContainer,
  ModalHeader,
  ModalCloseButton,
  ModalTitle,
  ModalContent
}
