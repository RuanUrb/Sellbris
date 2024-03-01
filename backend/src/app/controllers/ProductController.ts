import { NextFunction, Request, Response } from "express";
import Product from "../../domain/entities/Product/Product";
import User from "../../domain/entities/User/User";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import Comment from "../../domain/entities/Comment/Comment";
import { cloudinary } from "../../infra/setup/cloudinary";
import { MAPBOX_TOKEN } from "../../infra/environment/env";
import { ObjectId } from "mongoose";
//import { Category } from "../models/category.model";
const geocoder = mbxGeocoding({
    accessToken: MAPBOX_TOKEN || ''
})

const getAllProducts = async (req: Request, res: Response, next: NextFunction)=>{
    const {count} = req.query
    const limit = Number(count)
    if(limit) {
        const products = await Product.find({}).sort({date: -1}).limit(limit)
        if(products) return res.json(products)
        else return res.json({message: 'error'})
    }else
     {
    const products = await Product.find({}).sort({date: -1})
    if(products) return res.json(products)
    else return res.json({message: 'error'})
}
    
    
}


const createProduct = async (req: Request, res: Response, next: NextFunction)=>{
    const {title, price, description, location} = req.body
    console.log(req.body)
    console.log(req.files)
    const geoData = await geocoder.forwardGeocode({
        query: location,
        limit: 1
    }).send()
    const product = new Product({title, price, description, location})
    product.geometry = geoData.body.features[0].geometry
    if(req.files && Array.isArray(req.files) && req.files.length) product.images = req.files.map(f=>({url: f.path, filename: f.filename})) // there should be an else to set a NO IMAGE image
    else product.images = [{url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg', filename: 'NotFound.svg'}]
    
    //@ts-ignore
    product.seller = '65dd1e1f4ff6113638a5b762'
    
    product.date = new Date()
    await product.save()
    res.json(product)
}

const getProduct = async (req: Request, res: Response, next: NextFunction)=>{
    const {id} = req.params
    const product = await Product.findById(id).populate({
        path: 'comments',
        model: Comment,
        populate: {
            path: 'author',
            model: User,
            select: 'name'
        }
    })
    .populate({
        path: 'seller',
        model: User,
        select: 'name location'
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
    return res.json({message: 'success'})
}


export {createProduct, getProduct, editProduct, deleteProduct, getAllProducts}
