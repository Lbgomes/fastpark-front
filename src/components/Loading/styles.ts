import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background: rgba(255, 255, 255, 0.9);
  display: none;
  justify-content: center;
  align-items: center;
`

export const LoadingContent = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .spinner {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }
  .text {
    margin-top: 5px;
    font-weight: bold;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`
