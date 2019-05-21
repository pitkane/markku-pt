import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import markkuLogo from "src/images/markku-logo.svg";

interface Props {}
interface State {}

const StyledContainer = styled.div`
  height: 101px;
  background-color: ${props => props.theme.colors.headerBlue};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledMarkkuLogo = styled.img`
  height: 20px;
  position: absolute;
  left: 50px;
`;

const StyledH1 = styled.h1`
  color: white;
`;

export class Header extends React.Component<Props, State> {
  render() {
    return (
      <StyledContainer>
        <Link to="/">
          <StyledMarkkuLogo src={markkuLogo} />
        </Link>
        <StyledH1>Markku Personal Trainer</StyledH1>
      </StyledContainer>
    );
  }
}
