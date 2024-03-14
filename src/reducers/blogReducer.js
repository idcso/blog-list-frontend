import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import commentService from '../services/comment'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlogs(state, action) {
      const updatedBlog = action.payload
      return state
        .map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        .sort((a, b) => b.likes - a.likes)
    },
    filterBlogs(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlogs, filterBlogs } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const createNewBlog = (content, token) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(content, token)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (content) => {
  return async (dispatch) => {
    const likedBlog = await blogService.likeBlog(content)
    dispatch(updateBlogs(likedBlog))
  }
}

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id, token)
    dispatch(filterBlogs(id))
  }
}

export const createComment = (content, id) => {
  return async (dispatch) => {
    const commentedBlog = await commentService.createComment(id, content)
    dispatch(updateBlogs(commentedBlog))
  }
}

export default blogSlice.reducer
