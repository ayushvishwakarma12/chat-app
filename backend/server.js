import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(
  cors({
    origin: [
      "https://ayu-chat-app.vercel.app",
      "http://localhost:8000",
      "https://chat-app-1-g7ks.onrender.com/",
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend", "dist", "index.html"),
    function (error) {
      if (error) {
        res.status(500).send(error);
      }
    }
  );
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
});
