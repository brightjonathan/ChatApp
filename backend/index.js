import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from "morgan";
import {Server} from 'socket.io';
import http from 'http';
import path from 'path';

//all import file coming from a folder
import db from "./config/db.js";
import userRouter from "./routers/user.router.js";

//connection to database
db();
dotenv.config();

const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Add body-parser middleware with a higher limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//for all routes end-points
app.use('/api/auth', userRouter);


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});


//it has to be after the api routes
app.use(express.static(path.join(__dirname, '/client-app/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-app', 'dist', 'index.html'));
})


//local host connection
const port = 4000;
server.listen(port, ()=>{
 console.log(`server is running on port ${port}!!!`);
});


//middleware for handling errors 
app.use((err, req, res, next)=>{
  const statuscode  = err.statuscode || 500;
  const message = err.message || 'internal Server error';
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});



