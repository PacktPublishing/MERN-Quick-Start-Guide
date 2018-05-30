import * as React from 'react'
import * as ReactDOM from 'react-dom'

const RedText = ({ text }) => (
	<span style={{ color: 'red' }}>
		{text}
	</span>
)

const Welcome = ({ to }) => (
	<h1>Hello, <RedText text={to}/></h1>
)

const TodoList = (
	<ul>
		<li>Lunch at 14:00 with Jenny</li>
		<li>Shower</li>
	</ul>
)
class Footer extends React.Component {
	render() {
		return (
			<footer>
				{new Date().toDateString()}
			</footer>
		)
	}
}

ReactDOM.render(
	<div>
		<Welcome to="John" />
		{TodoList}
		<Footer />
	</div>,
	document.querySelector('[role="main"]'),
)
