require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const http = require("http");

const port = process.env.PORT || 5000;

const server = http.createServer(app);

app.use(cors());

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Socket.io");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
