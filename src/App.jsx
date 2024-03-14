import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import usersService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import {
  setUserLogin,
  initializeUser,
  setUserLogout,
} from './reducers/userReducer'
import { Routes, Route, useMatch, Link, useNavigate } from 'react-router-dom'

const App = () => {
  const [users, setUsers] = useState([])
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => setUsers(await usersService.getAllUsers()))()
  }, [])

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
    navigate('/')
  }

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  const userMatch = useMatch('/users/:id')
  const userInfo = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const navStyle = {
    margin: 4,
  }

  return (
    <div>
      {!user && <LoginForm userLogin={userLogin} />}
      {user && users && (
        <div>
          <nav>
            <Link to="/blogs" style={navStyle}>
              blogs
            </Link>
            <Link to="/users" style={navStyle}>
              users
            </Link>
            {user.username} logged in
            <button style={navStyle} onClick={handleLogout}>
              logout
            </button>
          </nav>
          <Notification />
          <h2>blog app</h2>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <BlogForm token={user.token} />
                  <Blogs />
                </>
              }
            />
            <Route path="blogs" element={<Blogs />} />
            <Route
              path="blogs/:id"
              element={<Blog blog={blog} user={user} />}
            />
            <Route path="users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User user={userInfo} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
