import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Button extends React.PureComponent {
	componentDidUpdate() {
		console.log('Button Component did update!')
	}
	render() {
		return (
			<button>{this.props.children}</button>
		)
	}
}
class Text extends React.Component {
	componentDidUpdate() {
		console.log('Text Component did update!')
	}
	render() {
		return this.props.children
	}
}

class App extends React.Component {
	state = {
		counter: 0,
	}
	componentDidMount() {
		this.intervalId = setInterval(() => {
			this.setState(({ counter }) => ({
				counter: counter + 1,
			}))
		}, 1000)
	}
	componentWillUnmount() {
		clearInterval(this.intervalId)
	}
	render() {
		const { counter } = this.state
		return (
			<React.Fragment>
				<h1>Counter: {counter}</h1>
				<Text>I'm just a text</Text>
				<Button>I'm a button</Button>
			</React.Fragment>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('[role="main"]'),
)
