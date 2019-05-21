import React from "react";
import styled from "styled-components";
import { ResizableBox } from "react-resizable";
import _ from "lodash";

import { Container, Row, Col, XTerm, Terminal } from "src/components";

interface Props {}
interface State {}
interface IRefs {
  [k: string]: any;
  xterm: XTerm;
}

const StyledContainer = styled(Container)``;

export class TerminalPage extends React.Component<Props, State> {
  refs: IRefs;

  throttleConsoleResize = _.throttle((size?) => {
    this.refs.xterm && this.refs.xterm.fit();
  }, 10);

  componentDidMount() {
    // runFakeTerminal(this.refs.xterm);
  }

  render() {
    return (
      <StyledContainer>
        <Row>
          <Col lg={6}>
            asdfasdfsadf afsdfas djsfadöasdföasdf ölasdf öasdf ösdf ödl ffdjas
            dfksdf aö asdfö asdföafs dlafs dla sfdlö1
          </Col>
          <Col lg={6}>
            <ResizableBox
              onResize={this.throttleConsoleResize}
              style={{
                overflow: "hidden"
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

function runFakeTerminal(xterm: XTerm) {
  // const term: Terminal = xterm.getTerminal();

  xterm.writeln("Markku.ai");
  xterm.writeln("Putting the AI in Maximum AIttack");
  xterm.writeln("");

  // term.on("paste", function(data, ev) {
  //   xterm.write(data);
  // });
}
