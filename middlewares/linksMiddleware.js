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
    const paramSchema = joi.object({
        id: joi.number().required()
    });

    const { error } = paramSchema.validate(req.params);

    if (error) {
        return res.status(422).send(error.details);
    }
    next();
}