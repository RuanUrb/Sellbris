import Joi from "joi";
import { NextFunction, Request, Response } from 'express';


const editProductSchema = Joi.object({
    title: Joi.string().max(40),
    description: Joi.string(),
    price: Joi.number().positive(),
    location: Joi.string()
})

const editProductValidator = (req: Request, res: Response, next: NextFunction)=>{
    const { error } = editProductSchema.validate(req.body)
    if (error) {
        const { details } = error;
        const errorMessages = details.map(({ message }) => message);
        return res.status(400).json({ status: 'Validation error', details: errorMessages });
      }
    
      return next();
}

export {editProductValidator}