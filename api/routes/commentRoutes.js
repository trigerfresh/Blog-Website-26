import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { addComment, getComments } from '../controllers/commentController.js'

const router = express.Router()

router.route('/:postId').get(getComments).post(protect, addComment)

export default router
