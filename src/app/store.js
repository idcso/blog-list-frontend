import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationSlice'
import blogsReducer from '../reducers/blogReducer'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
})
