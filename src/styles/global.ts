import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --danger-color: #F5365C;
  --info-color: #11CDEF;
  --warning-color: #FB6340;
  --success-color: #2DCE89;
}

  *{
    box-sizing: border-box;
    font-family: 'Nunito Sans', sans-serif;
    margin: 0;
    padding: 0;

    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

    //scrollbar configuration
    ::-webkit-scrollbar {
      width: 0.8rem;
      height: 0.8rem;
    }
    ::-webkit-scrollbar-track {
      background: #101010;
    }

    ::-webkit-scrollbar-thumb {
      background: #E4672E;
      border-radius: 1rem;
    }

    html {
      font-size: 62.5%;
    }

    body {
      background-color: #1C1C1C;
      color: #fff;
      font-family: 'Nunito Sans', sans-serif;
      font-size: 1.6rem;
    }

  & .swal2-popup {
    font-size: 1.75rem;
  }

  label.required::after {
    content: ' *';
    color: red;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .entire-row {
      margin-bottom: 5px;
      padding-bottom: 10px;
      background: transparent;
      min-width: 100%;
      .input-style {
        div {
          div {
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
.react-select__control, .react-select__menu{
    background: #1c1c1c;
    min-height: 44px;
}
.react-select__multi-value{
    background: #2e2e2e !important;

}
.react-select__multi-value__remove{
    :hover{
        background: #434343;
    }
}
.react-select__option:active {

    background: #2e2e2e;
    
}
.react-select__option:active{
        background: #343434;

    }
.react-select__menu-list {
    padding: 0%;
}
.react-select__option--is-focused{
    background: #2e2e2e;

}
  }

  .spinner {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  .spinner.small {
    border: 10px solid #f3f3f3;
    border-radius: 50%;
    border-top: 10px solid #3498db;
    width: 35px;
    height: 35px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }


  [id^='global-modal'] {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 4;

  display: flex;
  justify-content: center;
  align-items: center;
}


`

export default GlobalStyles