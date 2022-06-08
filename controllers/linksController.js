import connection from '../db.js'
import { nanoid } from 'nanoid'

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;
    const shortUrl = nanoid();
    try {
        const insert = await connection.query(`INSERT INTO "shortenedLinks" ("shortUrl", url, "visitCount", "userId") 
            VALUES ( $1, $2, $3, $4)`, [shortUrl, url, 0, userId]);
        res.status(201).send({ shortUrl: shortUrl });
    } catch (error) {
        res.sendStatus(500);
    }
}