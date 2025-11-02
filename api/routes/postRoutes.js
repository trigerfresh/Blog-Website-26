import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/postController.js'

const router = express.Router()

router
  .route('/')
  .get(getPosts)
  .post(protect, upload.single('image'), createPost)

router
  .route('/:id')
  .get(getPostById)
  .put(protect, upload.single('image'), updatePost)
  .delete(protect, deletePost)

router.put('/:id/like', protect, likePost)

export default router
