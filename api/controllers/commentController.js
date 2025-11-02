import Comment from '../models/Comment.js'

export const addComment = async (req, res) => {
  const comment = await Comment.create({
    postId: req.params.postId,
    userId: req.user._id,
    text: req.body.text,
  })
  res.json(comment)
}

export const getComments = async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).populate(
    'userId',
    'username'
  )
  res.json(comments)
}
