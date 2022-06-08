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

export async function getUrlId(req,res){
    const { id } = req.params;
    try {
        const consult = await connection.query(` SELECT * FROM "shortenedLinks" WHERE id = $1`, [id]);
        if (consult.rowCount === 0) {
            return res.sendStatus(404);
        }
        delete consult.rows[0].visitCount;
        delete consult.rows[0].userId;
        res.status(200).send(consult.rows[0]);
    } catch (error) {
        res.sendStatus(500);
    }
}