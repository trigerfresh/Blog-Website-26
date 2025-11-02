import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Dispatch the login thunk and get the result action
    const resultAction = await dispatch(login({ email, password }))

    // Check if login was successful
    if (login.fulfilled.match(resultAction)) {
      // Login successful → go to create page
      navigate('/create')
    } else {
      // Login failed → show an error
      alert(resultAction.payload || 'Login failed')
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  )
}
