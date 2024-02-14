import mongoose, { Schema } from 'mongoose';
import { IComment } from './IComment';

const CommentSchema = new mongoose.Schema({
  body: {type: String},
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});

export default mongoose.model<IComment>('Comment', CommentSchema);