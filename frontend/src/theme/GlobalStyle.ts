import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    color: ${theme.text};
    background: ${theme.secondary};
    font-family: proxima-nova, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${theme.text};
    text-decoration: none;
    font-weight: 600;
    transition: all 0.1s ease 0s;

    &:active,
    &:hover {
      color: ${theme.lendeskBlue};
    }
  }

  #root{
    margin:0 auto;
  }
`
