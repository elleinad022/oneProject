import express from "express";
import { getFeaturedMealsToday } from "../controllers/featuredMealsController.js";

import userAuth from "../middleware/userAuth.js";

const featuredMealsRouter = express.Router();

featuredMealsRouter.get("/today", userAuth, getFeaturedMealsToday);

export default featuredMealsRouter;
