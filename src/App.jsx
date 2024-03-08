import { useEffect } from 'react'
import { Blogs } from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import {
  setUserLogin,
  initializeUser,
  setUserLogout,
} from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const userLogin = (userObj) => {
    dispatch(setUserLogin(userObj))
  }

  const handleLogout = () => {
    dispatch(setUserLogout())
  }

  return (
    <Router>
      {!user && <LoginForm userLogin={userLogin} />}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.username} logged in</p>
          <button style={{ marginBottom: 20 }} onClick={handleLogout}>
            logout
          </button>
          <BlogForm token={user.token} />
          <Blogs user={user} />
        </div>
      )}
    </Router>
  )
}

export default App
