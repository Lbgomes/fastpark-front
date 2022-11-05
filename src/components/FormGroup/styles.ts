import styled, { css } from "styled-components";

interface IFormGroupProps {
  type?: "checkbox";
}
export const Container = styled.div``;

export const FormGroupInput = styled.div<IFormGroupProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 20px;

  .inputMask {
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
  }
`;
