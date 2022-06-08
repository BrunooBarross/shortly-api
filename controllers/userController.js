import connection from '../db.js'

export async function getUser(req, res) {
    const { id } = req.params;
    try {
        const selectUser = await connection.query(`
        SELECT u.id, u.name, SUM (s."visitCount") as "visitCount"
        FROM users u
        JOIN "shortenedLinks" s ON s."userId" = u.id  
        WHERE u.id = $1
        GROUP BY u.id;`
        ,[id]);
        const selectLinks = await connection.query(`SELECT s.id, s."shortUrl", s.url, s."visitCount" from "shortenedLinks" as s WHERE "userId" = $1;`,[id]);
        const result = {
            id:selectUser.rows[0].id, 
            name:selectUser.rows[0].name, 
            visitCount: selectUser.rows[0].visitCount, 
            shortenedUrls: selectLinks.rows
        };
        res.status(200).send(result);
    } catch (error) {
        res.sendStatus(500);
    }
}