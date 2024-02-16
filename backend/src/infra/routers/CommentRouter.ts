import express from 'express'
import { createComment, deleteComment } from '../../app/controllers/CommentController'
import { isAuthorized, isCommentAuthorized } from '../../app/middlewares/AuthorizedMiddleware'

const router = express.Router()

router.post('/', isAuthorized, createComment)

router.delete('/:commentId', isAuthorized, isCommentAuthorized , deleteComment)

export {router as commentRouter}
