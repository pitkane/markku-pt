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
    // const socket = await io("ws://localhost:8888");
    // this.socket = socket;
    // socket.on("connect", () => {
    //   console.log("connected: ", socket.connected); // false
    // });
    // socket.on("disconnect", () => {
    //   console.log("connected: ", socket.connected); // false
    // });
    // socket.on("lol", wat => {
    //   console.log("message: ", wat); // false
    // });
  };

  sendTestMessage = async () => {
    console.log("start");
    // const socket = io("ws://localhost:8080");
    await this.socket.emit("message", "lol");

    console.log(this.socket.connected);
    console.log(this.socket);
    // await socket.wait();
    // socket.emit
    // console.log(socket);
  };

  startDriving = async () => {
    const socket = await io("ws://0.0.0.0:3001");
    await socket.emit("car", "drive");

    socket.on("console-data", data => {
      // var bufView = new Uint8Array(data);

      // var buf = new Uint8Array(data).buffer;
      // var dv = new DataView(buf);

      var enc = new TextDecoder("utf-8");

      console.log(enc.decode(data));
    });

    console.log(socket.connected);
    console.log(socket);
    // await socket.wait();
    // socket.emit
    // console.log(socket);
  };

  render() {
    return (
      <StyledContainer>
        <Row>
          <Col>
            asdfasdfsadf afsdfas djsfadöasdföasdf ölasdf öasdf ösdf ödl ffdjas
            dfksdf aö asdfö asdföafs dlafs dla sfdlö1
            <button onClick={() => this.sendTestMessage()}>
              sendTestMessage
            </button>
            <button onClick={() => this.startDriving()}>
              this.startDriving()
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
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
