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

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://chat-app-cs92.onrender.com"
    : "http://localhost:8000";

app.use(
  cors({
    origin: ["https://ayu-chat-app.vercel.app", "http://localhost:8000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(`${baseUrl}/api/auth`, authRoutes);
app.use(`${baseUrl}/api/messages`, messageRoutes);
app.use(`${baseUrl}/api/users`, userRoutes);

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
