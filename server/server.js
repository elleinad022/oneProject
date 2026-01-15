import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import calorieLogRouter from "./routes/calorieLogRoutes.js";
import bodyWeightLogRouter from "./routes/bodyWeightLogRoutes.js";
import waterLogRouter from "./routes/waterLogRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API Endpoints
app.get("/", (req, res) => res.send("API is Working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/calories", calorieLogRouter);
app.use("/api/water", waterLogRouter);
app.use("/api/bodyweight", bodyWeightLogRouter);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
