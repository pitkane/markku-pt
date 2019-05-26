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
      name: "xterm-256color",
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

    term.write("echo moro\n");

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
    let theProcess;

    socket.on("carstop", data => {
      console.log("STOPSTOP");

      // data is actually the pid at the moment
      const pid = data;

      console.log(pid);

      process.kill(pid);

      // theProcess.stdin.write('echo "Hello $USER. Your machine runs since:"\n');
      // theProcess.stdin.write("uptime\n");

      console.log("kill");
      // theProcess.stdin.pause();
      // theProcess.exit();
    });

    socket.on("car", (data, callback) => {
      console.log("car", data);

      const { spawn } = require("child_process");

      theProcess = spawn("zsh", ["./drive.sh"]);

      console.log("PID: ", theProcess.pid);
      console.log("PID: ", theProcess.ppid);

      theProcess.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
        socket.emit("console-data", data);
      });

      theProcess.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
        socket.emit("console-data", data);
      });

      theProcess.on("exit", code => {
        console.log("Child exited");
      });

      callback(theProcess.pid);
    });
  });

  console.log("App listening to http://0.0.0.0:" + port);
};

startServer();
