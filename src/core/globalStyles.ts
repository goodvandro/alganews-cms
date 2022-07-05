import { transparentize } from 'polished';
import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Lato', sans-serif;
    background-color: #f3f8fa;
    color: #274060;
  }

  .confirm-overlay {
    background-color: ${transparentize(0.2, '#274060')}
  }

  .confirm-overlay {
    background-color: ${transparentize(0.2, '#f3f8fa')}
  }
`