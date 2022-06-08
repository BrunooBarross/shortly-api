import connection from '../db.js'

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) { return res.sendStatus(401) };
    try {
        const selectToken = await connection.query(` SELECT * FROM sessions WHERE token = $1`,[token]);
        if( selectToken.rowCount === 0){
            return res.sendStatus(401);
        }
        res.locals.userId = selectToken.rows[0].userId;
        next();
    } catch (error) {
        res.sendStatus(500);
    }
}