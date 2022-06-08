import { Router } from "express";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateUrl, validateUrlId } from "../middlewares/linksMiddleware.js";
import { shortenUrl, getUrlId } from "../controllers/linksController.js";

const linksRouter = Router();

linksRouter.post('/urls/shorten', validateToken, validateUrl, shortenUrl);
linksRouter.get('/urls/:id', validateUrlId, getUrlId);

export default linksRouter;