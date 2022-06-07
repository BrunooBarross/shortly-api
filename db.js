import dotenv from "dotenv";
import pg from 'pg';

dotenv.config();
const { Pool } = pg;

const connection = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT_POSTGRES,
    database: process.env.DATABASE
});

export default connection;