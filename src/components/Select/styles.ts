import styled from "styled-components";

export const Dropdown = styled.div`
  display: flex;
  width: 100%;

  .entire-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    padding-bottom: 10px;
    background: transparent;
    width: 100%;
    .input-style {
      div {
        div {
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
    .react-select__control,
    .react-select__menu {
      background: #1c1c1c;
      min-height: 44px;
    }
    .react-select__multi-value {
      background: #2e2e2e !important;
    }
    .react-select__multi-value__remove {
      :hover {
        background: #434343;
      }
    }
    .react-select__option:active {
      background: #2e2e2e;
    }
    .react-select__option:active {
      background: #343434;
    }
    .react-select__menu-list {
      padding: 0%;
    }
    .react-select__option--is-focused {
      background: #2e2e2e;
    }
    .react-select__single-value {
      background-color: transparent;
    }
  }

  .expirate-row {
    margin-top: -30px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    min-width: 30%;
  }
`;
