import Joi from "joi";
import { NextFunction, Request, Response } from 'express';

const createCommentSchema = Joi.object({
    body: Joi.string().required().min(1).max(100)
})

const createCommentValidator = (req: Request, res: Response, next: NextFunction)=>{
    const { error } = createCommentSchema.validate(req.body)
    if (error) {
        const { details } = error;
        const errorMessages = details.map(({ message }) => message);
        return res.status(400).json({ status: 'Validation error', details: errorMessages });
      }
      return next();
}

export {createCommentValidator}