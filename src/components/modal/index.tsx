import React from 'react'
import ReactDOM from 'react-dom'
import { GrFormClose } from 'react-icons/gr'

import { ThemeProvider } from 'styled-components'
import theme from '../../styles/theme'
import { v4 as uuidv4 } from 'uuid'

import {
  ModalCloseButton,
  ModalContent,
  ModalContentContainer,
  ModalHeader,
  ModalTitle
} from './style'

type Props = {
  title: string
  content: React.ReactElement
}

const showModal = ({ title, content }: Props) => {
  const modalId = `global-modal_${uuidv4()}`

  const modal = document.createElement('div')
  modal.id = modalId

  document.body.appendChild(modal)

  const contentToShow = React.cloneElement(content, {
    modalId,
    ...content.props
  })

  ReactDOM.render(
    //Obrigatório o provider para o modal*******
    <ThemeProvider theme={theme}>
      <ModalContentContainer >
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalCloseButton type="button" onClick={() => hideModal()}>
            <GrFormClose size={25} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalContent>{contentToShow}</ModalContent>
      </ModalContentContainer>
    </ThemeProvider>,
    document.getElementById(modalId)
  )
  return modalId
}

const hideModal = (modalId?: string) => {
  let modal = null as HTMLElement | null
  if (modalId) {
    modal = document.getElementById(`${modalId}`)
  } else {
    modal = document.querySelector(`[id^='global-modal']`)
  }

  if (modal) {
    modal.remove()
  }
}

export { showModal, hideModal }
