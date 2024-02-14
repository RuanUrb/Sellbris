import { Document, Schema, Types } from 'mongoose';

interface Image{
    url: string
    filename: string
}

export interface IProduct extends Document {
    title: string;
    images: Image[];
    price: number;
    description: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    location: string;
    comments: Types.ObjectId[];
    date: Date;
    seller: Types.ObjectId;
    //categories: Types.ObjectId[];
  }