

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import connectDB from './database/dbConnect.js';
import { router as userRouter } from './routes/userRoutes.js';
import { router as courseRouter } from "./routes/courseRoutes.js";

dotenv.config();


const app = express();

// call database connection
connectDB();



app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send("Server is running");
})
app.listen(PORT,()=>{
     console.log(`Server is Listening on http://localhost:${8080}`);
})











