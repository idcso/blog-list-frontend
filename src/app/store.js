import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationSlice'
import blogsReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})
