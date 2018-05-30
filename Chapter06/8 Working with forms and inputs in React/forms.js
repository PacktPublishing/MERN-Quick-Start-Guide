import * as React from 'react'
import * as ReactDOM from 'react-dom'

class LoginForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
		}
		this.onChange = this.onChange.bind(this)
	}
	onChange(event) {
		const { name, value } = event.target
		this.setState({
			[name]: name === 'username'
				? value.replace(/\d/gi, '')
				: value
		})
	}
	render() {
		return (
			<form>
				<input
					type="text"
					name="username"
					placeholder="Username"
					value={this.state.username}
					onChange={this.onChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={this.state.password}
					onChange={this.onChange}
				/>
				<pre>
					{JSON.stringify(this.state, null, 2)}
				</pre>
			</form>
		)
	}
}

ReactDOM.render(
	<LoginForm />,
	document.querySelector('[role="main"]'),
)
