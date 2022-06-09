import { Router } from "express";
import { validateClienteId } from "../middlewares/userMiddleware.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { getUser, getRanking } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/users/:id', validateToken, validateClienteId, getUser);
userRouter.get('/ranking', getRanking);

export default userRouter;