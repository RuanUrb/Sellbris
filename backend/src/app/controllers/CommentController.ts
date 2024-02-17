import { NextFunction, Request, Response } from "express";
import Product from "../../domain/entities/Product/Product";
import Comment from "../../domain/entities/Comment/Comment";
const createComment = async (req: Request, res: Response, next: NextFunction)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    if(!product) return res.status(404).json({error: 'Product not found.'})
    const comment = new Comment({body: req.body.body})
    comment.author = req.body.id
    product.comments.push(comment.id)
    comment.date = new Date()
    await comment.save();
    await product.save();
    return res.status(201).json({message: 'Sucessful'})
}

const deleteComment = async (req: Request, res: Response, next: NextFunction)=>{
    const {id, commentId} = req.params
        await Product.findByIdAndUpdate(id, { $pull: { comments: commentId } });
        await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({message: 'Deleted successfully'})
}

export {createComment, deleteComment}