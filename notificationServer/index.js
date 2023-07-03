const http = require("http");
const express = require("express");
const PORT = 3002;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

require("./consumer")(io);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
