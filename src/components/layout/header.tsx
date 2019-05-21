import React from "react";
import styled from "styled-components";

import markkuLogo from "src/images/markku-logo.svg";

interface Props {}
interface State {}

const StyledContainer = styled.div`
  height: 101px;
  background-color: ${props => props.theme.colors.headerBlue};
  display: flex;
  flex-direction: row;
`;

const StyledMarkkuLogo = styled.img`
  height: 25px;
`;

export class Header extends React.Component<Props, State> {
  render() {
    return (
      <StyledContainer>
        <StyledMarkkuLogo src={markkuLogo} />
        <h2>Markku Personal Trainer</h2>
      </StyledContainer>
    );
  }
}
