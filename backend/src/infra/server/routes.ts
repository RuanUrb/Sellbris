import { Router } from 'express'
import { userRouter } from '../routers/UserRouter'
import { productRouter } from '../routers/ProductRouter'
import { commentRouter } from '../routers/CommentRouter'

const router = Router()
router.use(userRouter)
router.use('/products', productRouter)
router.use('/products/:id/comments', commentRouter)
export {router}