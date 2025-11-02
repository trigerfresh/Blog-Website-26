import { useDispatch, useSelector } from 'react-redux'
import { likePost, deletePost } from '../features/postSlice'
import { useNavigate } from 'react-router-dom'

export default function PostCard({ post }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  if (!post) return null

  // Determine if current user is the author
  const isAuthor = user && user.user._id === post.author?._id

  const handleLike = () => {
    if (user) {
      dispatch(likePost({ id: post._id, token: user.token }))
    }
  }

  const handleDelete = () => {
    if (user && window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost({ id: post._id, token: user.token }))
    }
  }

  const handleEdit = () => {
    if (user) {
      // Navigate to CreatePost page with post data for editing
      navigate('/create', { state: { post } })
    }
  }

  return (
    <div className="card mb-3">
      {post.image && (
        <img
          src={`http://localhost:5000/${post.image}`}
          className="card-img-top"
          alt=""
          style={{
            width: '150px',
            height: '100px',
            objectFit: 'cover',
            margin: '10px auto',
            display: 'block',
            borderRadius: '5px',
          }}
        />
      )}
      <div className="card-body">
        <h5>{post.title}</h5>
        <p>{post.content}</p>
        <small className="text-muted">by {post.author?.username}</small>

        <div className="mt-2">
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={handleLike}
          >
            👍 {post.likes.length}
          </button>

          {/* Show Edit/Delete only for post author */}
          {isAuthor && (
            <>
              <button
                className="btn btn-sm btn-outline-success me-2"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
