import { Router } from "express";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateUrl, validateUrlId, validateShortUrl, validateDeleteId } from "../middlewares/linksMiddleware.js";
import { shortenUrl, getUrlId, getShortUrl, deleteUrl } from "../controllers/linksController.js";

const linksRouter = Router();

linksRouter.post('/urls/shorten', validateToken, validateUrl, shortenUrl);
linksRouter.get('/urls/:id', validateUrlId, getUrlId);
linksRouter.get('/urls/open/:shortUrl', validateShortUrl, getShortUrl);
linksRouter.delete('/urls/:id',validateUrlId, validateToken, validateDeleteId, deleteUrl, deleteUrl);

export default linksRouter;