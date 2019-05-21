import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  body {
    font-family: 'Karla', 'Helvetica', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 110%;
  }

  h1, h2, h3, h4 {
    font-weight: 300 !important;
  }

  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyles;
