import connection from '../db.js'
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

export async function signUp( req, res ) {
    const { name, email, password } = req.body;
    const date = dayjs().locale('en-us').format('YYYY-MM-DD')
    const criptPassword = bcrypt.hashSync(password, 10);

    try {
        const insert = connection.query(` INSERT INTO users (name, email, password, "createdAt") VALUES ( $1, $2, $3, $4)`, 
            [ name, email, criptPassword, date]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
        console.log( 'erro signUp')
    }
}