import { Router } from "express";
import { validateClienteId } from "../middlewares/userMiddleware.js";
import { getUser, getRanking } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/users/ranking', getRanking);
userRouter.get('/users/:id', validateClienteId, getUser);

export default userRouter;