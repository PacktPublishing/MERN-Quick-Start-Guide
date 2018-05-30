import * as React from 'react'
import * as ReactDOM from 'react-dom'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hasError: false,
			message: null,
			where: null,
		}
	}
	componentDidCatch(error, info) {
		this.setState({
			hasError: true,
			message: error.message,
			where: info.componentStack,
		})
	}
	render() {
		const { hasError, message, where } = this.state
		return (hasError
			? <details style={{ whiteSpace: 'pre-wrap' }}>
				<summary>{message}</summary>
				<p>{where}</p>
			</details>
			: this.props.children
		)
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.onClick = this.onClick.bind(this)
	}
	onClick() {
		this.setState(() => {
			throw new Error('Error while setting state.')
		})
	}
	render() {
		return (
			<button onClick={this.onClick}>
				Buggy button!
			</button>
		)
	}
}

ReactDOM.render(
	<ErrorBoundary>
		<App />
	</ErrorBoundary>,
	document.querySelector('[role="main"]'),
)
