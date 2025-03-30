

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import connectDB from './database/dbConnect.js';
import { router as userRoute } from './routes/userRoutes.js';
import { router as courseRoute } from "./routes/courseRoutes.js";
import { router as mediaRoute } from "./routes/mediaRoutes.js";
import {router as purchaseRoute } from "./routes/PurchaseCourseRoutes.js"
import { router as courseProgressRoute } from "./routes/courseProgressRoutes.js";
dotenv.config({});




// call database connection
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 


// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));








// API routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);



app.get("/", (req,res)=>{
    res.send("Server is running");
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});


app.listen(PORT,()=>{
     console.log(`Server is Listening on http://localhost:${8080}`);
})











