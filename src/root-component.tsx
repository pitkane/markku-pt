import React, { Fragment } from "react";

import { ThemeProvider } from "styled-components";

import HomePage from "./home-page";
import theme from "src/styles/theme";
import GlobalStyles from "src/styles/global-styles";

// later in your app
const RootComponent: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <HomePage />
        <GlobalStyles />
      </Fragment>
    </ThemeProvider>
  );
};

export default RootComponent;
