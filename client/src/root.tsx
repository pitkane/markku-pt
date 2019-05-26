import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { Container } from "react-grid-system";

import { theme } from "src/styles/theme";
import GlobalStyles from "src/styles/global-styles";

import { Header, Footer } from "src/components";
import HomePage from "src/modules/home-page";
import DrivePage from "src/modules/drive-page";
import TrainPage from "src/modules/train-page";
import TrainingPage from "src/modules/training-page";
import TerminalModule from "src/modules/terminal-module";
import TestPage from "src/modules/test-page";

interface Props {}
interface State {}

const StyledContainer = styled(Container)`
  padding: 0px !important;
  position: relative !important;
  min-height: 100vh;
`;
const StyledMainContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
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
              <Route path="/drive" exact component={DrivePage} />
              <Route path="/train" exact component={TrainPage} />
              <Route path="/training" exact component={TrainingPage} />
              <Route path="/test" exact component={TestPage} />
              {/* <Route path="/terminal" exact component={TerminaPage} /> */}
            </StyledMainContainer>

            <Footer />
          </StyledContainer>
          <TerminalModule />

          <GlobalStyles />
        </Router>
      </ThemeProvider>
    );
  }
}

export default RootComponent;
