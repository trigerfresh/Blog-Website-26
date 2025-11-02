import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

app.listen(PORT, () => {
  connectDB()
  console.log(`Running at PORT ${PORT}`)
})

export default app
