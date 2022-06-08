import { Router } from "express";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateUrl, validateUrlId, validateShortUrl } from "../middlewares/linksMiddleware.js";
import { shortenUrl, getUrlId, getShortUrl } from "../controllers/linksController.js";

const linksRouter = Router();

linksRouter.post('/urls/shorten', validateToken, validateUrl, shortenUrl);
linksRouter.get('/urls/:id', validateUrlId, getUrlId);
linksRouter.get('/urls/open/:shortUrl', validateShortUrl, getShortUrl);

export default linksRouter;