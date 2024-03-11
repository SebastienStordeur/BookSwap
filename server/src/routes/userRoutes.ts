import express from "express";
import { login, signup } from "../controllers/userController";
import { rateLimiter } from "../middlewares/rate-limit";

const router = express.Router();

router.post("/signup", rateLimiter, signup);
router.post("/login", rateLimiter, login);

export default router;
