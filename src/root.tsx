import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { Container } from "react-grid-system";

import { theme } from "src/styles/theme";
import GlobalStyles from "src/styles/global-styles";

import { Header, Footer } from "src/components";
import { HomePage } from "src/modules/home-page";

interface Props {}
interface State {}

const StyledContainer = styled(Container)`
  padding: 0px !important;
`;
const StyledMainContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
  min-height: 500px;
`;

// later in your app
export class RootComponent extends React.Component<Props, State> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <StyledContainer fluid>
            <Header />

            <StyledMainContainer>
              <Route path="/" exact component={HomePage} />
            </StyledMainContainer>

            <Footer />
          </StyledContainer>
          <GlobalStyles />
        </Router>
      </ThemeProvider>
    );
  }
}

export default RootComponent;
