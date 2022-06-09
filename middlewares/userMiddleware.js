import joi from 'joi';
import connection from '../db.js'

export async function validateClienteId(req, res, next) {
    const sessionUserId = parseInt(res.locals.userId);
    const convertNumber = { id: parseInt(req.params.id)}
    const paramSchema = joi.object({
        id: joi.number().required()
    });

    const { error } = paramSchema.validate(convertNumber);

    if (error) {
        return res.status(422).send(error.details);
    }
    
    try {
        const insert = await connection.query(`SELECT * FROM users WHERE id = $1`, [convertNumber.id]);
        
        if( insert.rowCount === 0 ){
            return res.sendStatus(404);
        }

        if ( insert.rows[0].id !== sessionUserId){
            return res.sendStatus(409);
        }
        next();
    } catch (error) {
        res.sendStatus(500);
    }
}