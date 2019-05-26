import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import markkuLogo from "src/images/markku-logo.svg";
import futuriceLogo from "src/images/futurice-logo.svg";
import headerBg from "src/images/header-bg.svg";

interface Props {}
interface State {}

const StyledContainer = styled.div`
  height: 101px;
  background-color: ${props => props.theme.colors.headerBlue};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-image: url(${headerBg});
  background-repeat: no-repeat;
  background-position: center;
`;

const StyledMarkkuLogo = styled.img`
  height: 20px;
  position: absolute;
  left: 50px;
  top: 35px;
`;

const StyledFuturiceLogo = styled.img`
  height: 20px;
  position: absolute;
  right: 50px;
  top: 40px;
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
          <StyledH1>Markku Personal Trainer</StyledH1>
        </Link>
        <a
          href="https://www.futurice.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledFuturiceLogo src={futuriceLogo} />
        </a>
      </StyledContainer>
    );
  }
}
