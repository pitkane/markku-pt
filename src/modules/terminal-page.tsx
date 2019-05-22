import React from "react";
import styled from "styled-components";
import { ResizableBox } from "react-resizable";
import io from "socket.io-client";
import _ from "lodash";

import { Container, Row, Col, XTerm } from "src/components";

interface Props {}
interface State {}
interface IRefs {
  [k: string]: any;
  xterm: XTerm;
}

const StyledContainer = styled(Container)``;

export class TerminalPage extends React.Component<Props, State> {
  refs: IRefs;
  socket: any;

  throttleConsoleResize = _.throttle((size?) => {
    this.refs.xterm && this.refs.xterm.fit();
  }, 10);

  componentDidMount = async () => {
    // runFakeTerminal(this.refs.xterm);
    const socket = await io("http://localhost:8080");

    this.socket = socket;

    socket.on("connect", () => {
      console.log("connected: ", socket.connected); // false
    });

    socket.on("disconnect", () => {
      console.log("connected: ", socket.connected); // false
    });

    socket.on("lol", wat => {
      console.log("message: ", wat); // false
    });
  };

  sendTestMessage = async () => {
    console.log("start");
    // const socket = io("http://localhost:8080");
    await this.socket.emit("message", "lol");

    console.log(this.socket.connected);
    // await socket.wait();
    // socket.emit
    // console.log(socket);
  };

  render() {
    return (
      <StyledContainer>
        <Row>
          <Col lg={6}>
            asdfasdfsadf afsdfas djsfadöasdföasdf ölasdf öasdf ösdf ödl ffdjas
            dfksdf aö asdfö asdföafs dlafs dla sfdlö1
            <button onClick={() => this.sendTestMessage()}>
              sendTestMessage
            </button>
          </Col>
          <Col lg={6}>
            <ResizableBox
              height={100}
              width={100}
              onResize={this.throttleConsoleResize}
              style={{
                overflow: "hidden",
                width: "100%",
                height: "100%"
              }}
            >
              <XTerm ref="xterm" style={{}} />
            </ResizableBox>
          </Col>
        </Row>
      </StyledContainer>
    );
  }
}

export default TerminalPage;
