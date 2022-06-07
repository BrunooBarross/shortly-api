import { Router } from "express";
import { signUp } from "../controllers/authController.js"
import { validateSignUp } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post('/signup', validateSignUp, signUp);

export default authRouter;