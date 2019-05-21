import React from "react";
import styled from "styled-components";
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

  componentDidMount() {
    runFakeTerminal(this.refs.xterm);
  }

  render() {
    return (
      <StyledContainer>
        <Row>
          <Col>1</Col>
          <Col>
            <XTerm
              ref="xterm"
              style={{
                addons: ["fit", "fullscreen", "search", "terminado"],
                overflow: "hidden",
                position: "relative",
                width: "100%",
                height: "100%"
              }}
            />
          </Col>
        </Row>
      </StyledContainer>
    );
  }
}

export default TerminalPage;

function runFakeTerminal(xterm: XTerm) {
  const term: Terminal = xterm.getTerminal();

  xterm.writeln("Markku.ai");
  xterm.writeln("Putting the AI in Maximum AIttack");
  xterm.writeln("");

  term.on("paste", function(data, ev) {
    xterm.write(data);
  });
}
