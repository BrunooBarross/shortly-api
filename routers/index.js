import Router from "express";
import authRouter from "./authRouter.js";
import linksRouter from "./linksRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(authRouter);
router.use(linksRouter);
router.use(userRouter);

export default router;