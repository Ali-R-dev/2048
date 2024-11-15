import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.darkText};
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    touch-action: none;
  }

  .container {
    text-align: center;
    padding: 20px;
  }

  h1 {
    font-size: 80px;
    margin: 0 0 20px;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 40px;
      margin: 0 0 15px;
    }
  }

  .instructions {
    margin-top: 20px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.darkText};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 14px;
      margin-top: 15px;
    }
  }
`;
