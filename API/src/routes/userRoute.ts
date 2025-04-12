import { Router } from "express";
import { getUserSummary } from "../controllers/userController";

const userRoute = Router();

userRoute.get("/summary", getUserSummary);

export { userRoute };