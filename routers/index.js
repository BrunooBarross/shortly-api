import Router from "express";
import authRouter from "./authRouter.js";
import linksRouter from "./linksRouter.js";

const router = Router();

router.use(authRouter);
router.use(linksRouter);

export default router;