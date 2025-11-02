import path from 'path'
import Post from '../models/Post.js'

export const createPost = async (req, res) => {
  try {
    const imagePath = req.file ? `uploads/${req.file.filename}` : null
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: imagePath,
      author: req.user._id,
    })
    res.json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Error creating post' })
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username email')
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: error.message })
  }
}

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'author',
      'username email'
    )
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post not found' })

    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Unauthorized' })

    if (req.file && post.image) {
      const oldPath = path.join(process.cwd(), post.image)
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      post.image = `/uploads/${req.file.filename}`
    }

    post.title = req.body.title || post.title
    post.content = req.body.content || post.content

    const updated = await post.save()
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: error.message })
  }
}

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post not found' })

    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Unauthorized' })

    // Delete image if exists
    if (post.image) {
      const filePath = path.join(process.cwd(), post.image)
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }

    await post.deleteOne()
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ✅ Like / Unlike Post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post not found' })

    const userId = req.user._id.toString()
    const alreadyLiked = post.likes.includes(userId)

    if (alreadyLiked) {
      // Unlike the post
      post.likes = post.likes.filter((id) => id.toString() !== userId)
    } else {
      // Like the post
      post.likes.push(userId)
    }

    await post.save()
    res.json({
      message: alreadyLiked ? 'Post unliked' : 'Post liked',
      likesCount: post.likes.length,
      likes: post.likes,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error liking post' })
  }
}
