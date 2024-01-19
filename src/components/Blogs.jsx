import { useState } from 'react'

const Blog = ({ blog, username, handleBlogLike, handleDeleteBlog }) => {
  const [displayBlog, setDisplayBlog] = useState(false)
  const [buttonName, setButtonName] = useState('view')
  const [likes, setLikes] = useState(blog.likes)

  const handleBlogView = () => {
    setDisplayBlog(!displayBlog)
    buttonName === 'view' ? setButtonName('hide') : setButtonName('view')
  }

  const putLike = async () => {
    const updatedBlog = await handleBlogLike({
      ...blog,
      user: blog.user.id,
      likes: likes + 1
    })
    setLikes(updatedBlog.likes)
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await handleDeleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleBlogView}>{buttonName}</button>
      </div>
      {displayBlog && (
        <div>
          {blog.url} <br />
          likes {likes} <button onClick={putLike}>like</button> <br />
          {blog.user.username ? blog.user.username : username} <br />
          {blog.user.username === username &&
            <button onClick={deleteBlog}>remove</button>
          }
        </div>
      )}
    </div>
  )
}

const Blogs = props => (
  <div>
    {props.blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          username={props.username}
          handleBlogLike={props.handleBlogLike}
          handleDeleteBlog={props.handleDeleteBlog}
        />
      ))
    }
  </div>
)

export default Blogs