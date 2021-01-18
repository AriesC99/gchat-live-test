var express = require("express");
var socket = require("socket.io");
var app = express();
console.log("connect to server");
var server = require("./server");

app.use(express.static("public"));

var io = socket(server);

io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  socket.on("chat", function (data) {
    io.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

module.exports = app;
