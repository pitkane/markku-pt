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
    const send = USE_BINARY_UTF8 ? bufferUtf8(ws, 5) : buffer(ws, 5);

    term.on("data", function(data) {
      try {
        send(data);
      } catch (ex) {
        // The WebSocket is not open, ignore
      }
    });

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

// // var express = require("express");
// // var https = require("https");
// // var http = require("http");
// var fs = require("fs");
// var pty = require("node-pty");

// // var app = express();

// // Creating an HTTP server
// // var server = http.createServer(app).listen(3001);

// // var io = require("socket.io")(server);

// // var server = require("http").createServer(app);
// // var io = require("socket.io")(server);
// let express = require("express");
// let app = express();
// let server = require("http").Server(app);
// let io = require("socket.io")(server);

// server.listen(3001, "127.0.0.1");

// // server.listen(3001, "localhost", function() {
// //   console.log(
// //     "Express server listening on %d, in %s mode",
// //     3001,
// //     app.get("env")
// //   );
// // });

// // When a new socket connects
// io.on("connection", function(socket) {
//   console.log("new connection");
//   // Create terminal

//   var ptyProcess = pty.spawn("bash", [], {
//     name: "xterm-color",
//     cols: 80,
//     rows: 30,
//     cwd: process.env.HOME,
//     env: process.env
//   });

//   // terminal -> client
//   ptyProcess.on("data", function(data) {
//     console.log("terminal -> client: ", data);
//     socket.emit("output", data);
//   });

//   // client -> terminal
//   socket.on("input", function(data) {
//     console.log("client -> terminal: ", data);
//     ptyProcess.write(data);
//   });

//   // Listen on the terminal for output and send it to the client
//   socket.on("car", function(data) {
//     console.log("drive");
//   });

//   // When socket disconnects, destroy the terminal
//   socket.on("disconnect", function() {
//     ptyProcess.destroy();
//     console.log("socket disconnected");
//   });
// });

// // var http = require("http");
// // var express = require("express");
// // var io = require("socket.io");
// // var pty = require("node-pty");

// // var socket;
// // var term;
// // var buff = [];

// // // create shell process
// // term = pty.spawn("bash", [], {
// //   name: "xterm-256color",
// //   cols: 80,
// //   rows: 24,
// //   cwd: process.env.HOME
// // });

// // // store term's output into buffer or emit through socket
// // term.on("data", function(data) {
// //   return !socket ? buff.push(data) : socket.emit("data", data);
// // });

// // console.log(
// //   "Created shell with pty master/slave pair (master: %d, pid: %d)",
// //   term.fd,
// //   term.pid
// // );

// // var app = express();
// // var server = http.createServer(app);

// // // let term.js handle req/res
// // // app.use(Terminal.middleware());

// // // let server listen on the port
// // server.listen(3002);

// // // let socket.io handle sockets
// // // io = io.listen(server, { log: false });

// // // io.sockets.on("connection", function(s) {
// // //   // when connect, store the socket
// // //   socket = s;

// // //   // handle incoming data (client -> server)
// // //   socket.on("data", function(data) {
// // //     term.write(data);
// // //   });

// // //   // handle connection lost
// // //   socket.on("disconnect", function() {
// // //     socket = null;
// // //   });

// // //   // send buffer data to client
// // //   while (buff.length) {
// // //     socket.emit("data", buff.shift());
// // //   }
// // // });

// // // // server.run({ port: 3002 });
