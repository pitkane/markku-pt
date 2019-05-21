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
  var shellprompt = "$ ";

  function prompt() {
    xterm.write("\r\n" + shellprompt);
  }
  xterm.writeln("Markku.ai");
  xterm.writeln("Putting the AI in Maximum AIttack");
  xterm.writeln("");
  prompt();

  // term.on("key", function(key, ev) {
  //   var printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

  //   if (ev.keyCode === 13) {
  //     prompt();
  //     // } else if (ev.keyCode == 8) {
  //     //   // Do not delete the prompt
  //     //   if (term['x'] > 2) {
  //     //     xterm.write('\b \b');
  //     //   }
  //   } else if (printable) {
  //     xterm.write(key);
  //   }
  // });

  term.on("paste", function(data, ev) {
    xterm.write(data);
  });
}
