import mongoose, { Schema } from 'mongoose';
import { IProduct } from './IProduct';

const ImageSchema = new Schema({
    url: {type: String},
    filename: {type: String}
})

const ProductSchema = new Schema<IProduct>({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,

     //geometry should be declared as following due to mongoDB geospatial APIs compatibility
     geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    location: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    date: {
        type: Date,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    /*categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]*/
    // ACCOUNT THAT ISSUED SHOULD BE HERE
}, {toJSON: {virtuals: true}})  // this is needed due to virtuals not naturally being rendered when product is JSON-stringified.

ProductSchema.virtual('properties.popUp').get(()=>{
    return // SHOULD RETURN BRIEF DESCRIPTION OF THE PRODUCT
})

ProductSchema.post('findOneAndDelete', async ()=>{
    // THERE SHOULD BE A HOOK TO DELETE ALL ASSOCIATED REVIEWS WHEN THE PRODUCT IS DELETED
    //OPTIONAL: DELETE ALL IMAGES ON CLOUDINARY TO THIS ASSOCIATED PRODUCT
})

export default mongoose.model<IProduct>('Product', ProductSchema);
