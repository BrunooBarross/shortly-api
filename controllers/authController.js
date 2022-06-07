import connection from '../db.js'
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    const date = dayjs().locale('en-us').format('YYYY-MM-DD');
    const criptPassword = bcrypt.hashSync(password, 10);

    try {
        const insert = connection.query(` INSERT INTO users (name, email, password, "createdAt") VALUES ( $1, $2, $3, $4)`,
            [name, email, criptPassword, date]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    const date = dayjs().locale('en-us').format('YYYY-MM-DD')

    try {
        const consulta = await connection.query(` SELECT * FROM users WHERE email = $1`, [email]);
        if (bcrypt.compareSync(password, consulta.rows[0].password)) {
            const token = uuid();
            const insert = await connection.query(` INSERT INTO sessions (token, "userId", "createdAt") VALUES ( $1, $2, $3)`
                , [token, consulta.rows[0].id, date]);
            return res.status(200).send(token);
        }
        res.sendStatus(401);
    } catch (error) {
        res.sendStatus(500);
    }
}