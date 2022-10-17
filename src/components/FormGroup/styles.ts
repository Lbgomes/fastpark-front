import styled, { css } from 'styled-components'

interface IFormGroupProps {
  type?: 'checkbox'
}
export const Container = styled.div``

export const FormGroupInput = styled.div<IFormGroupProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 20px;
`
