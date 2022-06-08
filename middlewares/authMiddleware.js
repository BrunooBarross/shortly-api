import connection from '../db.js'
import joi from 'joi';

export async function validateSignUp(req, res, next) {

    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.ref('password')
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(422).send(error.details);
    }

    try {
        const selectName = await connection.query(` SELECT * FROM users WHERE name = $1`, [req.body.name]);
        const selectEmail = await connection.query(` SELECT * FROM users WHERE email = $1`, [req.body.email]);
        if (selectName.rowCount > 0) {
            return res.status(409).send("Nome já está em uso")
        }
        if (selectEmail.rowCount > 0) {
            return res.status(409).send("Email já está em uso")
        }
        next();
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function validateSignIn(req, res, next) {

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(422).send(error.details);
    }

    try {
        const selectEmail = await connection.query(` SELECT * FROM users WHERE email = $1`, [req.body.email]);
        if (selectEmail.rowCount === 0) {
            return res.sendStatus(401);
        }
        next();
    } catch (error) {
        res.sendStatus(500);
    }
}