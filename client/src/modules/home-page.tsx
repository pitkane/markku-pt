import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {}
interface State {}

const StyledContainer = styled.div``;
const StyledNavigation = styled.div`
  display: flex;
  justify-content: space-between;
`;

class HomePage extends React.Component<Props, State> {
  render() {
    return (
      <StyledContainer>
        <StyledNavigation>
          <Link to="/drive">/drive</Link>
          <Link to="/train">/train</Link>
          <Link to="/training">/training</Link>
          <Link to="/drive">/drive</Link>
          <Link to="/test">/test</Link>
        </StyledNavigation>
      </StyledContainer>
    );
  }
}

export default HomePage;
