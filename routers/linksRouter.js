import { Router } from "express";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateUrl } from "../middlewares/linksMiddleware.js";
import { shortenUrl } from "../controllers/linksController.js";

const linksRouter = Router();

linksRouter.post('/urls/shorten', validateToken, validateUrl, shortenUrl);

export default linksRouter;