import { Request, Response, NextFunction } from 'express';
import Product from '../../domain/entities/Product/Product';
import Comment from '../../domain/entities/Comment/Comment';

const isAuthorized = async (req: Request, res: Response, next: NextFunction)=>{
    const {id} = req.params
    console.log(id)
    const product = await Product.findById(id)
    if(!product) return res.status(404).json({error: 'Resource not found.'})
    const userId = product.seller
    if(userId !== req.body.id) return res.status(401).json({error: 'You do not have permission to do this'})
    next()
}

const isCommentAuthorized = async (req: Request, res: Response, next: NextFunction)=>{
    const {commentId} = req.params 
    const comment = await Comment.findById(commentId)
    if(!comment) return res.status(404).json({error: 'Resource not found.'})
    const authorId = comment.author
    if(authorId != req.body.id) return res.status(401).json({error: 'You do not have permission to do this'})
    next()
}

export {isAuthorized, isCommentAuthorized}