import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { Blogs } from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationSlice'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (localUser) {
      setUser(localUser)
    }
  }, [])

  const userLogin = async (userObj) => {
    try {
      const user = await loginService.userLogin(userObj)
      dispatch(
        setNotification({
          message: 'successfully logged in',
          style: 'success',
        })
      )
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      return user
    } catch (error) {
      dispatch(
        setNotification({
          message: 'wrong username or password',
          style: 'error',
        })
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    dispatch(
      setNotification({
        message: 'successfully logged out',
        style: 'success',
      })
    )
  }

  return (
    <div>
      {!user && <LoginForm userLogin={userLogin} />}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm token={user.token} />
          <Blogs user={user} />
        </div>
      )}
    </div>
  )
}

export default App
