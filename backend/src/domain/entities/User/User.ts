import mongoose, { Schema } from 'mongoose';
import { IUser } from './IUser';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  location: {type: String},
  products: [{
    type: Schema.Types.ObjectId,
    ref: ''
  }]

});

export default mongoose.model<IUser>('User', UserSchema);