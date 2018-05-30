import * as React from 'react'
import * as ReactDOM from 'react-dom'

class LoginForm extends React.Component {
	refForm = React.createRef()
	constructor(props) {
		super(props)
		this.state = {}
		this.onSubmit = this.onSubmit.bind(this)
		this.onClick = this.onClick.bind(this)
	}
	onSubmit(event) {
		const form = this.refForm.current
		const data = new FormData(form)
		this.setState({
			user: data.get('user'),
			pass: data.get('pass'),
		})
		event.preventDefault()
	}
	onClick(event) {
		const form = this.refForm.current
		form.dispatchEvent(new Event('submit'))
	}
	render() {
		const { onSubmit, onClick, refForm, state } = this
		return (
			<React.Fragment>
				<form onSubmit={onSubmit} ref={refForm}>
					<input type="text" name="user" />
					<input type="text" name="pass" />
				</form>
				<button onClick={onClick}>LogIn</button>
				<pre>{JSON.stringify(state, null, 2)}</pre>
			</React.Fragment>
		)
	}
}
ReactDOM.render(
	<LoginForm />,
	document.querySelector('[role="main"]'),
)
