import joi from 'joi';
import connection from '../db.js'

export async function validateClienteId(req, res, next) {
    const { id } = req.params;

    const paramSchema = joi.object({
        id: joi.number().required()
    });

    const { error } = paramSchema.validate(req.params);

    if (error) {
        return res.status(422).send(error.details);
    }
    
    try {
        const insert = await connection.query(`SELECT * FROM users WHERE id = $1`, [id]);
        
        if( insert.rowCount === 0 ){
            return res.sendStatus(404);
        }
        next();
    } catch (error) {
        res.sendStatus(500);
    }
}