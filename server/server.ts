var express = require("express");
var cors = require("cors");
var expressWs = require("express-ws");
var os = require("os");
var pty = require("node-pty");

/**
 * Whether to use UTF8 binary transport.
 * (Must also be switched in client.ts)
 */
const USE_BINARY_UTF8 = false;

function startServer() {
  var app = express();
  app.use(cors());

  expressWs(app);

  // var server = require("http").Server(app);
  // var io = require("socket.io")(server);

  var terminals = {};
  var logs = {};

  app.post("/terminals", function(req, res) {
    var cols = parseInt(req.query.cols),
      rows = parseInt(req.query.rows),
      term = pty.spawn("bash", [], {
        name: "xterm-color",
        cols: cols || 80,
        rows: rows || 24,
        cwd: process.env.PWD,
        env: process.env,
        encoding: USE_BINARY_UTF8 ? null : "utf8"
      });

    console.log("Created terminal with PID: " + term.pid);
    terminals[term.pid] = term;
    logs[term.pid] = "";

    // when terminal receives data, buffer to logs
    term.on("data", function(data) {
      logs[term.pid] += data;
    });

    res.send(term.pid.toString());

    res.end();
  });

  app.ws("/terminals/:pid", function(ws, req) {
    var term = terminals[parseInt(req.params.pid)];

    console.log("Connected to terminal " + term.pid);

    ws.send(logs[term.pid]);

    // terminal -> client
    term.on("data", function(data) {
      ws.send(data);
    });

    // client -> terminal
    ws.on("message", function(msg) {
      term.write(msg);
    });

    ws.on("close", function() {
      term.kill();
      console.log("Closed terminal " + term.pid);
      // Clean things up
      delete terminals[term.pid];
      delete logs[term.pid];
    });
  });

  const port = 3001;
  const host = "0.0.0.0";

  var server = app.listen(port, host);
  var io = require("socket.io").listen(server);

  io.on("connection", function(socket) {
    socket.on("car", function(data) {
      console.log("car", data);

      socket.emit("yolo");
    });
  });

  console.log("App listening to http://0.0.0.0:" + port);
  // app.listen(port, host);
}

startServer();
