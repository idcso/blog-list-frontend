import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [displayBlog, setDisplayBlog] = useState(false)
  const [buttonName, setButtonName] = useState('view')
  const [likes, setLikes] = useState(blog.likes)

  const dispatch = useDispatch()

  const handleBlogView = () => {
    setDisplayBlog(!displayBlog)
    buttonName === 'view' ? setButtonName('hide') : setButtonName('view')
  }

  const putLike = () => {
    dispatch(
      likeBlog({
        ...blog,
        user: blog.user.id,
        likes: likes + 1,
      })
    )
    setLikes(likes + 1)
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id, user.token))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={handleBlogView}>{buttonName}</button>
      </div>
      {displayBlog && (
        <div className="blogInfo">
          {blog.url} <br />
          likes {likes}{' '}
          <button datatype="like-button" onClick={putLike}>
            like
          </button>{' '}
          <br />
          {blog.user.username ? blog.user.username : user.username} <br />
          {(blog.user.id === user.id || blog.user === user.id) && (
            <button onClick={handleDeleteBlog}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

const Blogs = (props) => {
  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <div className="blogs">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={props.user} />
      ))}
    </div>
  )
}

export { Blog, Blogs }
