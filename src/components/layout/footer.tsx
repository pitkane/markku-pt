import React from "react";
import styled from "styled-components";

interface Props {}
interface State {}

const StyledContainer = styled.div`
  height: 64px;
  background-color: ${p => p.theme.colors.headerBlue};
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: white;
  }
`;

export class Footer extends React.Component<Props, State> {
  render() {
    return (
      <StyledContainer>
        <a href="https://markku.ai">Markku.ai</a>
      </StyledContainer>
    );
  }
}
