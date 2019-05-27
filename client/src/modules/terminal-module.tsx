import React, { useState } from "react";
import styled from "styled-components";
import { ResizableBox } from "react-resizable";

import { Container, XTerm } from "src/components";

const StyledContainer = styled(Container)`
  position: fixed !important;
  bottom: 0 !important;
  left: 50%;
  transform: translate(-50%);
`;

const TerminalModule: React.FC = () => {
  const [showConsole, setShowConsole] = useState(false);

  const toggleConsole = () => {
    setShowConsole(!showConsole);
  };

  return (
    <StyledContainer>
      <button onClick={() => toggleConsole()}>
        {showConsole ? "Hide console" : "Show console"}
      </button>
      {showConsole && (
        <ResizableBox
          height={100}
          width={200}
          // onResize={this.throttleConsoleResize}
          style={{
            overflow: "hidden",
            width: "100%",
            height: "100%"
          }}
        >
          <XTerm />
        </ResizableBox>
      )}
    </StyledContainer>
  );
};

export default TerminalModule;
