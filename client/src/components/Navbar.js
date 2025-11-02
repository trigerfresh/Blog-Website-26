import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'

export default function Navbar() {
  const { user } = useSelector((s) => s.auth)
  const dispatch = useDispatch()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          My Blog
        </Link>
        <div>
          {user ? (
            <>
              <span className="text-white me-3">{user.user.username}</span>
              <button
                className="btn btn-sm btn-outline-light"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline-light me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-outline-light">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
