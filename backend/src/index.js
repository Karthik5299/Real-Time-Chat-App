import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {app,server} from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";

dotenv.config();


const PORT = process.env.PORT;
const __dirname = path.resolve();

// Increase the limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Uncomment this if you are serving the frontend from the same server
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }

server.listen(PORT, () => {
    console.log('Server is running on PORT:' + PORT);
    connectDB();
});