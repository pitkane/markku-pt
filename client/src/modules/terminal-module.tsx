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

const StyledContainer = styled(Container)`
  position: fixed !important;
  bottom: 0 !important;
`;

export class TerminalModule extends React.Component<Props, State> {
  refs: IRefs;
  socket: any;

  state = {
    drivingPid: null
  };

  throttleConsoleResize = _.throttle((size?) => {
    this.refs.xterm && this.refs.xterm.fit();
  }, 10);

  componentDidMount = async () => {};

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
    await socket.emit("car", "drive", ack => {
      console.log("ack:", ack);
      this.setState({ drivingPid: ack });
    });

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

  stopDriving = async () => {
    console.log("sending stop");
    const socket = await io("ws://0.0.0.0:3001");
    await socket.emit("carstop", this.state.drivingPid);

    // await socket.wait();
    // socket.emit
    // console.log(socket);
  };

  render() {
    return (
      <StyledContainer>
        <Row>
          <Col>
            <button onClick={() => this.sendTestMessage()}>
              sendTestMessage
            </button>
            <br />
            <br />
            <button onClick={() => this.startDriving()}>
              this.startDriving()
            </button>
            <button onClick={() => this.stopDriving()}>
              this.stopDriving()
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

export default TerminalModule;
