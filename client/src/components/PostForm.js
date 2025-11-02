import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../features/postSlice'

export default function PostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector((s) => s.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (image) formData.append('image', image)
    dispatch(createPost({ formData, token: user.token }))
    setTitle('')
    setContent('')
    setImage(null)
  }

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <h5>Create Post</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        className="form-control mb-2"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button className="btn btn-primary">Post</button>
    </form>
  )
}
