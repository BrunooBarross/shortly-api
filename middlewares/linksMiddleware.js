import joi from 'joi';

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