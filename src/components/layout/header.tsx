import React from "react";
import styled from "styled-components";

interface Props {}
interface State {}

const StyledContainer = styled.div``;

export class Header extends React.Component<Props, State> {
  render() {
    return <StyledContainer>header</StyledContainer>;
  }
}
