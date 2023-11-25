import { createServer } from "node:http";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

import baseRouter from "./routes";
import { auth } from "./sockets/middlewares/auth";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", baseRouter);

app.use((req, res) => {
  if (!res.headersSent) {
    res.send("Welcome to server");
  }
});

const server = createServer(app);

/**
 * Initializing socket handlers
 */
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
app.set("io", io);

io.use(auth);
io.on("connection", (socket) => {
  socket.join(socket.user.id.toString());
});

// app.use((req) => (req.io = io));

export default server;
