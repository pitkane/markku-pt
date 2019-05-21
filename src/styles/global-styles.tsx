import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyles = createGlobalStyle`

  body {
    font-family: 'Karla', 'Helvetica', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 110%;
    color: ${theme.colors.text};
  }

  h1, h2, h3, h4 {
    font-family:'Open Sans', sans-serif;
    font-weight: 300 !important;
  }

  h1 {
    font-size: 36px;
  }

  a {
    color: ${theme.colors.text};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyles;
