import * as React from 'react'
import * as ReactDOM from 'react-dom'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Untitled',
		}
		this.onBtnClick = this.onBtnClick.bind(this)
	}
	onBtnClick() {
		this.setState({
			title: 'Hello there!',
		})
	}
	render() {
		return (
			<section>
				<h1>{this.state.title}</h1>
				<button onClick={this.onBtnClick}>
					Click me to change the title
				</button>
			</section>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('[role="main"]'),
)
