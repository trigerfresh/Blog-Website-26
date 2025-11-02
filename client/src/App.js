// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'

// Components
import Navbar from './components/Navbar' // ✅ Import Navbar

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth)
  if (!user) return <Navigate to="/login" />
  return children
}

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <Router>
      {/* ✅ Navbar visible on all pages */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/create" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/create" />}
        />

        {/* Protected Routes */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create/:id"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
