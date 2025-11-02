import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { likePost, deletePost } from '../features/postSlice'

export default function PostCard({ post }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLike = () => {
    if (user) {
      dispatch(likePost({ id: post._id, token: user.token }))
    }
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost({ id: post._id, token: user.token }))
    }
  }

  const handleEdit = () => {
    navigate(`/create/${post._id}`)
  }

  return (
    <div className="card mb-3">
      {post.image && (
        <img
          src={`http://localhost:5000/${post.image}`}
          className="card-img-top"
          alt={post.title}
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h5>{post.title}</h5>
        <p>{post.content}</p>
        <small className="text-muted">by {post.author?.username}</small>

        <div className="mt-3">
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={handleLike}
          >
            👍 {post.likes.length}
          </button>

          {/* Show Edit/Delete only if user is the post author */}
          {user && user._id === post.author?._id && (
            <>
              <button
                className="btn btn-sm btn-outline-warning me-2"
                onClick={handleEdit}
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleDelete}
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
