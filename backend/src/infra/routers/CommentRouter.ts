import express from 'express'
import { createComment, deleteComment } from '../../app/controllers/CommentController'
import { isCommentAuthorized } from '../../app/middlewares/AuthorizedMiddleware'
import { verifyJWT } from '../../app/middlewares/AuthMiddleware'
import { createCommentValidator } from '../../app/validators/CreateCommentValidator'

const router = express.Router()

router.post('/:id/comments', verifyJWT, createCommentValidator, createComment)

router.delete('/:id/comments/:commentId', verifyJWT, isCommentAuthorized , deleteComment)

export {router as commentRouter}
