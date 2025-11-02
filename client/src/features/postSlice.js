import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api/posts'

// Fetch all posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get(API)
  return res.data
})

// Create a post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ title, content, image, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (image) formData.append('image', image)

      const res = await axios.post(API, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Update a post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, title, content, image, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (image) formData.append('image', image)

      const res = await axios.put(`${API}/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Delete a post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Like a post
export const likePost = createAsyncThunk(
  'posts/like',
  async ({ id, token }) => {
    const res = await axios.put(
      `${API}/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return { id, ...res.data }
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState: { posts: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Create post
      .addCase(createPost.fulfilled, (state, action) => {
        // Replace if exists (shouldn’t happen), else add
        const index = state.posts.findIndex((p) => p._id === action.payload._id)
        if (index === -1) state.posts.unshift(action.payload)
        else state.posts[index] = action.payload
      })

      // Update post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p._id === action.payload._id)
        if (index !== -1) state.posts[index] = action.payload
      })

      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.payload)
      })
  },
})

export default postSlice.reducer
