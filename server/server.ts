var os = require("os");
var pty = require("node-pty");


var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const expressWebsocket = require("express-ws")(app);

// Instantiate shell and set up data handlers
expressWebsocket.app.ws("/shell", (ws, req) => {
  var ptyProcess = pty.spawn("/bin/bash", [], {
    name: "xterm-color",
    cols: 120,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  /// prepare environment
  ptyProcess.write("cd ~/pitkane/d2\n");
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

app.get("/", (req, res) => {
  res.send("moro");
});

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });

  console.log("connection created")

  socket.on('car', (data) => {
    console.log(data);
  });
});

console.log("Starting on port 3001 ");

// Start the application
server.listen(3001);
