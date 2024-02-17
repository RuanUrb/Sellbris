import express from 'express'
import { createComment, deleteComment } from '../../app/controllers/CommentController'
import { isCommentAuthorized } from '../../app/middlewares/AuthorizedMiddleware'
import { verifyJWT } from '../../app/middlewares/AuthMiddleware'

const router = express.Router()

router.post('/:id/comments', verifyJWT, createComment)

router.delete('/:id/comments/:commentId', verifyJWT, isCommentAuthorized , deleteComment)

export {router as commentRouter}
