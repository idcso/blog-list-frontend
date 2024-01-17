import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')
  const [style, setStyle] = useState('')

  useEffect(() => {
    (async () => setBlogs(await blogService.getAll()))()  
  }, [])

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (localUser) {
      setUser(localUser)
    }
  }, [])

  const createNotification = (message, style) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 5000)
    setStyle(style)
  }

  const handleUserLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.userLogin({ username, password })
      createNotification('successfully logged in', 'success')
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      createNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    createNotification('successfully logged out', 'success')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    
    try {
      await blogService.createNewBlog({ title, author, url }, user.token)
      setBlogs(await blogService.getAll())
      createNotification(`a new blog ${title} by ${author} added`, 'success')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      createNotification(`title or url is not provided`, 'error')
    }
  }

  return (
    <div>
      {!user && (
        <LoginForm
          username={username}
          password={password}
          message={notification}
          style={style}
          handleUserLogin={handleUserLogin}
          setUsername={ ({ target }) => setUsername(target.value) }
          setPassword={ ({ target }) => setPassword(target.value) }
        />
      )}
      {user &&
        <Blogs
          username={user.username}
          handleLogout={handleLogout}
          title={title}
          author={author}
          url={url}
          message={notification}
          style={style}
          setTitle={ ({ target }) => setTitle(target.value) }
          setAuthor={ ({ target }) => setAuthor(target.value) }
          setUrl={ ({ target }) => setUrl(target.value) }
          handleCreateBlog={handleCreateBlog}
          blogs={blogs}
        />
      }
    </div>
  )
}

export default App