import React from "react";
import styled from "styled-components";
import ReactSpinners from "react-spinners";

interface Props {}
interface State {}

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 100px;
`;

export class Loader extends React.Component<Props, State> {
  render() {
    return (
      <LoaderContainer>
        <ReactSpinners.RotateLoader color={"#122a6b"} />
      </LoaderContainer>
    );
  }
}

export default Loader;
