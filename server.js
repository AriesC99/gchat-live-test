const http = require("http");
const app = require("./index");
const socket = require("socket.io");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = socket(server);
io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  socket.on("chat", function (data) {
    io.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

server.listen(port, function () {
  console.log("port is: " + port);
});
