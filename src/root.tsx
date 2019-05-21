import React, { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

import { myTheme } from "src/styles/my-theme";
import GlobalStyles from "src/styles/global-styles";

import { Header, Footer } from "src/components";
import { HomePage } from "src/modules/home-page";

interface Props {}
interface State {}

const StyledContainer = styled.div``;
const StyledMainContainer = styled.div``;

// later in your app
export class RootComponent extends React.Component<Props, State> {
  render() {
    return (
      <ThemeProvider theme={myTheme}>
        <Fragment>
          <StyledContainer>
            <Header />

            <StyledMainContainer>
              <Router>
                <Route path="/" exact component={HomePage} />
              </Router>
            </StyledMainContainer>

            <Footer />
          </StyledContainer>
          <GlobalStyles />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default RootComponent;
