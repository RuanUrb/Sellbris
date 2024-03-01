import Joi from "joi";
import { NextFunction, Request, Response } from 'express';


const createProductSchema = Joi.object({
    title: Joi.string().max(40).required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    location: Joi.string().required()
})

const createProductValidator = (req: Request, res: Response, next: NextFunction)=>{
    const { error } = createProductSchema.validate(req.body)
    if (error) {
        const { details } = error;
        const errorMessages = details.map(({ message }) => message);
        return res.status(400).json({ status: 'Validation error', details: errorMessages });
      }
      return next();
}

export {createProductValidator}