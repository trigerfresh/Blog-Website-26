import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api/comments'

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId) => {
    const res = await axios.get(`${API}/${postId}`)
    return { postId, comments: res.data }
  }
)

export const addComment = createAsyncThunk(
  'comments/add',
  async ({ postId, text, token }) => {
    const res = await axios.post(
      `${API}/${postId}`,
      { text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return { postId, comment: res.data }
  }
)

const commentSlice = createSlice({
  name: 'comments',
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state[action.payload.postId] = action.payload.comments
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state[action.payload.postId].push(action.payload.comment)
      })
  },
})

export default commentSlice.reducer
