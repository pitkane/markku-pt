import React, { useState } from "react";
import io from "socket.io-client";

import { Container, Row, Col } from "src/components";

interface Props {}

const DrivePage: React.FC = () => {
  const [drivingPid, setDrivingPid] = useState(null);

  const startDriving = async () => {
    const socket = await io("ws://0.0.0.0:3001");
    await socket.emit("car", "drive", ack => {
      console.log("ack:", ack);
      setDrivingPid(ack);
    });

    socket.on("console-data", data => {
      var enc = new TextDecoder("utf-8");

      console.log(enc.decode(data));
    });
  };

  const stopDriving = async () => {
    console.log("sending stop");
    const socket = await io("ws://0.0.0.0:3001");
    await socket.emit("carstop", drivingPid);
  };

  return (
    <Container>
      <Row>
        <Col>
          <button onClick={() => startDriving()}>this.startDriving()</button>
          <button onClick={() => stopDriving()}>this.stopDriving()</button>
        </Col>
      </Row>
    </Container>
  );
};

export default DrivePage;
