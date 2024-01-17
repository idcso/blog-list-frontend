import Notification from "./Notification"

const BlogForm = props => (
	<div>
		<h2>create new</h2>
		<form onSubmit={props.handleCreateBlog}>
			title:
			<input
				type="text"
				value={props.title}
				name='Username'
				onChange={ props.setTitle }
			/><br />
			author:
			<input
				type="text"
				value={props.author}
				name='Username'
				onChange={ props.setAuthor }
			/><br />
			url:
			<input
				type="text"
				value={props.url}
				name='Username'
				onChange={ props.setUrl }
			/><br />
		<button>create</button>
	</form>
	</div>
)

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const Blogs = props => (
  <div>
    <h2>blogs</h2>
		<Notification message={props.message} style={props.style} />
    <p>
      {props.username} logged in
      <button onClick={props.handleLogout}>logout</button>
    </p>
    <BlogForm
      title={props.title}
      author={props.author}
      url={props.url}
      setTitle={props.setTitle}
      setAuthor={props.setAuthor}
      setUrl={props.setUrl}
      handleCreateBlog={props.handleCreateBlog}
    />
    {props.blogs
      .filter(blog => blog.user.username === props.username)
      .map(blog => <Blog key={blog.id} blog={blog} />)
    }
  </div>
)

export default Blogs