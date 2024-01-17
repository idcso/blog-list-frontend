import Notification from "./Notification"

const LoginForm = props => (
	<div>
		<h2>log in to application</h2>
		<Notification message={props.message} style={props.style} />
		<form onSubmit={props.handleUserLogin}>
			<div>
				username
				<input
					type="text"
					value={props.username}
					name='Username'
					onChange={props.setUsername}
				/>
			</div>
			<div>
				password
				<input
					type="text"
					value={props.password}
					name='Password'
					onChange={props.setPassword}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	</div>
)

export default LoginForm