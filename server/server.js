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
import featuredMealsRouter from "./routes/featuredMealsRoutes.js";
import workoutProgramRouter from "./routes/workoutPlanRoutes.js";
import personalRecordRouter from "./routes/personalRecordRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const frontendUrl =
  process.env.NODE_ENV === "production"
    ? process.env.ALLOWED_ORIGIN
    : "http://localhost:5173";

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// API Endpoints
app.get("/", (req, res) => res.send("API is Working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/calories", calorieLogRouter);
app.use("/api/water", waterLogRouter);
app.use("/api/bodyweight", bodyWeightLogRouter);
app.use("/api/featured-meals", featuredMealsRouter);
app.use("/api/workout", workoutProgramRouter);
app.use("/api/progress", personalRecordRouter);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
