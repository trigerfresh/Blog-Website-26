import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../features/postSlice'
import { useNavigate, useLocation } from 'react-router-dom'

export default function CreatePost() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)

  const editingPost = location.state?.post

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title)
      setContent(editingPost.content)
    }
  }, [editingPost])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return

    const token = user.token

    if (editingPost) {
      await dispatch(
        updatePost({
          id: editingPost._id,
          title,
          content,
          image,
          token,
        })
      )
    } else {
      await dispatch(
        createPost({
          title,
          content,
          image,
          token,
        })
      )
    }

    // Clear form after submit
    setTitle('')
    setContent('')
    setImage(null)
    navigate('/') // redirect to home
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h3>{editingPost ? 'Edit Post' : 'Create Post'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          className="form-control mb-2"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="btn btn-primary w-100">
          {editingPost ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  )
}
