import styled, { css } from 'styled-components'

export const InputContainer = styled.input`
  outline: none;
  width: 100%;
  height: 44px;
  background: transparent;
  border-radius: 5px;
  border: 1px solid white;
  transition: border-bottom 0.3s;
  color: white;
  padding: 8px 15px;
  &:focus {
    border-color: #e4672e;
  }
  &:disabled {
    border-color: rgba(255, 255, 255, 0.4);
  }
  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
  &[type='checkbox'] {
    width: 15px;
    height: 15px;
    &:hover {
      cursor: pointer;
    }
  }
`