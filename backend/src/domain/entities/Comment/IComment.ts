import { Document, Schema, Types } from 'mongoose';

export interface IComment extends Document {
  body: string,
  author: Schema.Types.ObjectId,
  date: Date
}