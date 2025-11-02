// src/pages/Home.js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../features/postSlice'
import PostCard from '../components/PostCard.js'

export default function Home() {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <div className="container mt-5">
      <h3>All Posts</h3>
      {loading && <p>Loading...</p>}
      {posts.length === 0 && !loading && <p>No posts found.</p>}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}
