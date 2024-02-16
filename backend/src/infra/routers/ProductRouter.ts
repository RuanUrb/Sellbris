import express, { Request, Response } from 'express'
const router = express.Router()
import { storage } from '../setup/cloudinary'
import multer from 'multer'
const upload = multer({storage})
import {createProduct, deleteProduct, editProduct, getProduct, getAllProducts} from '../../app/controllers/ProductController'
import { verifyJWT } from '../../app/middlewares/AuthMiddleware'
import { isAuthorized } from '../../app/middlewares/AuthorizedMiddleware'

router.get('/', getAllProducts)

router.get('/:id', getProduct)
    // THIS ROUTE DISPLAYS ALL INFO ABOUT A PRODUCT)

router.post('/', verifyJWT, upload.array('images'), createProduct)

router.put('/:id', verifyJWT, isAuthorized , editProduct)

router.delete('/:id', verifyJWT, isAuthorized,  deleteProduct)

export {router as productRouter}
