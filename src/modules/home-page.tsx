import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {}
interface State {}

const StyledContainer = styled.div``;

class HomePage extends React.Component<Props, State> {
  render() {
    return (
      <StyledContainer>
        <Link to="/terminal">/Terminal</Link>
      </StyledContainer>
    );
  }
}

export default HomePage;
