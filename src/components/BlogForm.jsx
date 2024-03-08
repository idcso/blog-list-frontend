import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationSlice'
import { createNewBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = ({ token }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      dispatch(createNewBlog({ title, author, url }, token))
      dispatch(
        setNotification({
          message: `a new blog ${title} by ${author} added`,
          style: 'success',
        })
      )
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      dispatch(
        setNotification({
          message: 'title or url is not provided',
          style: 'error',
        })
      )
    }
  }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <div>
        <h2 style={{ marginTop: 0 }}>create new</h2>
        <form onSubmit={handleCreateBlog}>
          title:
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          author:
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          url:
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
            style={{ marginBottom: 5 }}
          />
          <br />
          <button datatype="create-blog">create</button>
        </form>
      </div>
    </Togglable>
  )
}

BlogForm.propTypes = {
  token: PropTypes.string.isRequired,
}

export default BlogForm
