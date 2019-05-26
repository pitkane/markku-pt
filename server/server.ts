const express = require("express");
const cors = require("cors");
const expressWs = require("express-ws");
const pty = require("node-pty");

const shellHelper = require("./shellHelper");

const startServer = () => {
  const app = express();
  app.use(cors());

  expressWs(app);

  const terminals = {};
  const logs = {};

  app.post("/terminals", (req, res) => {
    const cols = parseInt(req.query.cols);
    const rows = parseInt(req.query.rows);
    const term = pty.spawn("bash", [], {
      name: "xterm-color",
      cols: cols || 80,
      rows: rows || 24,
      cwd: process.env.PWD,
      env: process.env
    });

    console.log("Created terminal with PID: " + term.pid);
    terminals[term.pid] = term;
    logs[term.pid] = "";

    // when terminal receives data, buffer to logs
    term.on("data", data => {
      logs[term.pid] += data;
    });

    res.send(term.pid.toString());

    res.end();
  });

  app.ws("/terminals/:pid", (ws, req) => {
    const term = terminals[parseInt(req.params.pid)];

    console.log("Connected to terminal " + term.pid);

    ws.send(logs[term.pid]);

    // terminal -> client
    term.on("data", data => {
      ws.send(data);
    });

    // client -> terminal
    ws.on("message", msg => {
      term.write(msg);
    });

    ws.on("close", () => {
      term.kill();
      console.log("Closed terminal " + term.pid);
      // Clean things up
      delete terminals[term.pid];
      delete logs[term.pid];
    });
  });

  const port = 3001;
  const host = "0.0.0.0";

  const server = app.listen(port, host);
  const io = require("socket.io").listen(server);

  io.on("connection", socket => {
    socket.on("car", data => {
      console.log("car", data);

      const { spawn } = require("child_process");

      const process = spawn("bash", ["./drive.sh"]);

      // ws.send(logs[term.pid]);

      // string message buffering
      function buffer(socket, timeout) {
        let s = "";
        let sender = null;
        return data => {
          s += data;
          if (!sender) {
            sender = setTimeout(() => {
              socket.send(s);
              s = "";
              sender = null;
            }, timeout);
          }
        };
      }
      // binary message buffering
      function bufferUtf8(socket, timeout) {
        let buffer = [];
        let sender = null;
        let length = 0;
        return data => {
          buffer.push(data);
          length += data.length;
          if (!sender) {
            sender = setTimeout(() => {
              socket.send(Buffer.concat(buffer, length));
              buffer = [];
              sender = null;
              length = 0;
            }, timeout);
          }
        };
      }
      const send = buffer(socket, 5);

      process.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
        // send(data);
        socket.emit("console-data", data);
      });

      process.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
        socket.emit("console-data", data);
      });

      process.on("exit", code => {
        console.log("Child exited");
      });
      // const runner = spawn("/bin/bash", [], {
      //   stdio: "inherit"
      // });

      // console.log(runner);

      // runner.stdout.on("data", data => {
      //   console.log(`stdout: ${data}`);
      // });

      // runner.stderr.on("data", data => {
      //   console.log(`stderr: ${data}`);
      // });

      // runner.on("close", code => {
      //   console.log(`child process exited with code ${code}`);
      // });
    });
  });

  console.log("App listening to http://0.0.0.0:" + port);
  // app.listen(port, host);
};

startServer();
