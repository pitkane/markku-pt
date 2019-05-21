import React from "react";
import styled from "styled-components";

interface Props {}
interface State {}

const StyledContainer = styled.div`
  width: 1440px;
  height: 64px;
  background-color: ${p => p.theme.colors.secondary};
`;
export class Footer extends React.Component<Props, State> {
  render() {
    return <StyledContainer>footer</StyledContainer>;
  }
}
