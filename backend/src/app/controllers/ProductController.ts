import { NextFunction, Request, Response } from "express";
import Product from "../../domain/entities/Product/Product";
import User from "../../domain/entities/User/User";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import Comment from "../../domain/entities/Comment/Comment";
import { cloudinary } from "../../infra/setup/cloudinary";
import { MAPBOX_TOKEN } from "../../infra/environment/env";
//import { Category } from "../models/category.model";
const geocoder = mbxGeocoding({
    accessToken: MAPBOX_TOKEN || ''
})

const getAllProducts = async (req: Request, res: Response, next: NextFunction)=>{
    const products = await Product.find({})
    if(products) res.json(products)
    else res.json({message: 'error'})
}

const createProduct = async (req: Request, res: Response, next: NextFunction)=>{
    const {title, price, description, location} = req.body
    const geoData = await geocoder.forwardGeocode({
        query: location,
        limit: 1
    }).send()
    const product = new Product({title, price, description, location})
    product.geometry = geoData.body.features[0].geometry
    if(req.files && Array.isArray(req.files)) product.images = req.files.map(f=>({url: f.path, filename: f.filename})) // there should be an else to set a NO IMAGE image
    else product.images = [{url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg', filename: 'NotFound.svg'}]
    
    product.seller = req.body.id
    
    product.date = new Date()
    await product.save()
    res.json(product)
}

const getProduct = async (req: Request, res: Response, next: NextFunction)=>{
    const {id} = req.params
    const product = await Product.findById(id).populate({
        path: 'comments',
        model: Comment
    })
    .populate({
        path: 'seller',
        model: User
    })
    /*
    .populate({
        path: 'categories',
        model: Category
    })*/

    if(product) res.json(product)
    else res.json({message: `The page you're trying to access does not exist.`})
}

const editProduct = async (req: Request, res: Response, next: NextFunction)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    if(!product) return res.status(404).json({error: 'Product not found.'})
    const p = await Product.findByIdAndUpdate(id, {...req.body})
    if(req.files && Array.isArray(req.files)){
        const images = req.files?.map(f=>({url: f.path, filename: f.filename}))
        product.images.push(...images)
    }
    if(req.body.deleteImages){
        for(const filename of req.body.deleteImages) await cloudinary.uploader.destroy(filename)
        await product?.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    } 
    await product.save()
    res.json({product})
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction)=>{
    const {id} = req.params
    await Product.findByIdAndDelete(id)
    res.json({message: 'success'})

}


export {createProduct, getProduct, editProduct, deleteProduct, getAllProducts}
