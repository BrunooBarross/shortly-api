import connection from '../db.js'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs';

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;
    const date = dayjs().locale('en-us').format('YYYY-MM-DD');
    const shortUrl = nanoid(8);
    try {
        const insert = await connection.query(`INSERT INTO "shortenedLinks" ("shortUrl", url, "visitCount", "userId", "createdAt") 
            VALUES ( $1, $2, $3, $4, $5)`, [shortUrl, url, 0, userId, date]);
        res.status(201).send({ shortUrl: shortUrl });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getUrlId(req,res){
    const id = parseInt(req.params.id)
    try {
        const consult = await connection.query(` SELECT * FROM "shortenedLinks" WHERE id = $1`, [id]);
        if (consult.rowCount === 0) {
            return res.sendStatus(404);
        }
        delete consult.rows[0].visitCount;
        delete consult.rows[0].userId;
        delete consult.rows[0].createdAt;
        res.status(200).send(consult.rows[0]);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getShortUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const consult = await connection.query(`SELECT * FROM "shortenedLinks" WHERE "shortUrl" = $1`, [shortUrl]);
        if (consult.rowCount === 0) {
            return res.sendStatus(404);
        }
        await connection.query(`
            UPDATE "shortenedLinks"
            SET "visitCount" = "visitCount" + 1
            WHERE  "shortUrl" = $1`, [shortUrl]);
        res.redirect(consult.rows[0].url);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req,res){
    const { urlId } = res.locals;
    try {
        await connection.query(`DELETE FROM "shortenedLinks" WHERE id = $1`, [urlId]);
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
}