import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: var(--black);
`

export const LeftContent = styled.div`
  height: 100%;
  width: 250px;
`

export const RightContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`

export const Content = styled.div`
  padding: 3rem 1.5rem;
  width: 100%;
  flex-grow: 1;
`
