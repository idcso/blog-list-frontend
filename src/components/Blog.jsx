import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  if (!blog) {
    return null
  }

  const [likes, setLikes] = useState(blog.likes)
  const dispatch = useDispatch()

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

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div className="blogInfo">
        {blog.url} <br />
        likes {likes}{' '}
        <button datatype="like-button" onClick={putLike}>
          like
        </button>{' '}
        <br />
        added by {blog.user.username ? blog.user.username : user.username}{' '}
        <br />
        {(blog.user.id === user.id || blog.user === user.id) && (
          <button onClick={handleDeleteBlog}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
