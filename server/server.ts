var os = require("os");
var pty = require("node-pty");

import * as express from "express";

const app = express();
const expressWs = require("express-ws")(app);

// Serve static assets from ./static
app.use(express.static(`${__dirname}/static`));

// Instantiate shell and set up data handlers
expressWs.app.ws("/shell", (ws, req) => {
  var ptyProcess = pty.spawn("/bin/bash", [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  /// prepare environment
  ptyProcess.write("cd ~/pitkane/d2");
  // ptyProcess.on("data", function(data) {
  // this outputs data into current stdout (console)
  //   process.stdout.write(data);
  // });

  // ptyProcess -> websocket
  ptyProcess.on("data", data => {
    ws.send(data);
  });

  // websocket -> ptyProcess
  ws.on("message", msg => {
    ptyProcess.write(msg);
  });
});

app.get("/", function(req, res) {
  res.send("moro");
});

// Start the application
app.listen(3001);
