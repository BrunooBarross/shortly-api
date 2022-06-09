import joi from 'joi';
import connection from '../db.js'

export function validateUrl(req, res, next) {
    const urlSchema = joi.object({
        url: joi.string().uri().required(),
    });

    const { error } = urlSchema.validate(req.body);

    if (error) {
        return res.status(422).send(error.details);
    }
    
    next();
}

export async function validateUrlId(req, res, next) {
    const convertNumber = { id: parseInt(req.params.id)}
    const paramSchema = joi.object({
        id: joi.number().required()
    });

    const { error } = paramSchema.validate(convertNumber);

    if (error) {
        return res.status(422).send(error.details);
    }
    next();
}

export async function validateShortUrl(req, res, next) {
    const paramSchema = joi.object({
        shortUrl: joi.string().required()
    });

    const { error } = paramSchema.validate(req.params);

    if (error) {
        return res.status(422).send(error.details);
    }
    next();
}

export async function validateDeleteId(req, res, next){
    const { id } = req.params;
    const { userId } = res.locals;
    try {
        const consult = await connection.query(`SELECT * FROM "shortenedLinks" WHERE id = $1`, [id]);
        if (consult.rowCount === 0) {
            return res.sendStatus(404);
        }
        if( consult.rows[0].userId !== userId){
            return res.sendStatus(401);
        }
        res.locals.urlId = consult.rows[0].id;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}