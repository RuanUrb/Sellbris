import { NextFunction, Request, Response } from "express";
import Product from "../../domain/entities/Product/Product";
import Comment from "../../domain/entities/Comment/Comment";
import mongoose from "mongoose";

const createComment = async (req: Request, res: Response, next: NextFunction)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    if(!product) return res.status(404).json({error: 'Product not found.'})
    const comment = new Comment({body: req.body.body})
    comment.author = req.body.id
    product.comments.push(comment.id)
    
    const session = await mongoose.startSession();
session.startTransaction();

try {
  await comment.save({ session });
  await product.save({ session });

  // If everything is successful, commit the transaction
  await session.commitTransaction();
  session.endSession();
} catch (error) {
  await session.abortTransaction();
  session.endSession();
  throw error;
}

}

const deleteComment = async (req: Request, res: Response, next: NextFunction)=>{
    const {id, commentId} = req.params
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await Product.findByIdAndUpdate(id, { $pull: { comments: commentId } }, { session });
      
        await Comment.findByIdAndDelete(commentId, { session });
      
        await session.commitTransaction();
        return res.json({ message: 'Successful' });
      } catch (error: any) {
        await session.abortTransaction();
        return res.status(500).json({ error: 'Transaction failed', message: error.message });
      } finally {
        // End the session
        session.endSession();
      }
}

export {createComment, deleteComment}