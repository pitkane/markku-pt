// var express = require("express");
// var https = require("https");
// var http = require("http");
var fs = require("fs");
var pty = require("node-pty");

// var app = express();

// Creating an HTTP server
// var server = http.createServer(app).listen(3001);

// var io = require("socket.io")(server);

// var server = require("http").createServer(app);
// var io = require("socket.io")(server);
let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

server.listen(3001, "127.0.0.1");

// server.listen(3001, "localhost", function() {
//   console.log(
//     "Express server listening on %d, in %s mode",
//     3001,
//     app.get("env")
//   );
// });

// When a new socket connects
io.on("connection", function(socket) {
  console.log("new connection");
  // Create terminal

  var ptyProcess = pty.spawn("bash", [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  // terminal -> client
  ptyProcess.on("data", function(data) {
    console.log("terminal -> client: ", data);
    socket.emit("output", data);
  });

  // client -> terminal
  socket.on("input", function(data) {
    console.log("client -> terminal: ", data);
    ptyProcess.write(data);
  });

  // Listen on the terminal for output and send it to the client
  socket.on("car", function(data) {
    console.log("drive");
  });

  // When socket disconnects, destroy the terminal
  socket.on("disconnect", function() {
    ptyProcess.destroy();
    console.log("socket disconnected");
  });
});

// var http = require("http");
// var express = require("express");
// var io = require("socket.io");
// var pty = require("node-pty");

// var socket;
// var term;
// var buff = [];

// // create shell process
// term = pty.spawn("bash", [], {
//   name: "xterm-256color",
//   cols: 80,
//   rows: 24,
//   cwd: process.env.HOME
// });

// // store term's output into buffer or emit through socket
// term.on("data", function(data) {
//   return !socket ? buff.push(data) : socket.emit("data", data);
// });

// console.log(
//   "Created shell with pty master/slave pair (master: %d, pid: %d)",
//   term.fd,
//   term.pid
// );

// var app = express();
// var server = http.createServer(app);

// // let term.js handle req/res
// // app.use(Terminal.middleware());

// // let server listen on the port
// server.listen(3002);

// // let socket.io handle sockets
// // io = io.listen(server, { log: false });

// // io.sockets.on("connection", function(s) {
// //   // when connect, store the socket
// //   socket = s;

// //   // handle incoming data (client -> server)
// //   socket.on("data", function(data) {
// //     term.write(data);
// //   });

// //   // handle connection lost
// //   socket.on("disconnect", function() {
// //     socket = null;
// //   });

// //   // send buffer data to client
// //   while (buff.length) {
// //     socket.emit("data", buff.shift());
// //   }
// // });

// // // server.run({ port: 3002 });
