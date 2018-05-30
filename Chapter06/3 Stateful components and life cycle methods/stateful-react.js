import * as React from 'react'
import * as ReactDOM from 'react-dom'

class LifeCycleTime extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			time: new Date().toTimeString(),
			color: null,
			dontUpdate: false,
		}
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		return nextProps
	}
	componentDidMount() {
		this.intervalId = setInterval(() => {
			this.setState({
				time: new Date().toTimeString(),
			})
		}, 100)
	}
	componentWillUnmount() {
		clearInterval(this.intervalId)
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.dontUpdate) {
			return false
		}
		return true
	}
	getSnapshotBeforeUpdate(prevProps, prevState) {
		return 'snapshot before update'
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log(
			'Component did update and received snapshot:',
			snapshot,
		)
	}
	render() {
		return (
			<span style={{ color: this.state.color }}>
				{this.state.time}
			</span>
		)
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			color: 'red',
			dontUpdate: false,
			unmount: false,
		}
		this.toggleColor = this.toggleColor.bind(this)
		this.toggleUpdate = this.toggleUpdate.bind(this)
		this.toggleUnmount = this.toggleUnmount.bind(this)
	}
	toggleColor() {
		this.setState((prevState) => ({
			color: prevState.color === 'red'
				? 'blue'
				: 'red',
		}))
	}
	toggleUpdate() {
		this.setState((prevState) => ({
			dontUpdate: !prevState.dontUpdate,
		}))
	}
	toggleUnmount() {
		this.setState((prevState) => ({
			unmount: !prevState.unmount,
		}))
	}
	render() {
		const {
			color,
			dontUpdate,
			unmount,
		} = this.state
		return (
			<React.Fragment>
				{unmount === false && <LifeCycleTime
					color={color}
					dontUpdate={dontUpdate}
				/>}
				<button onClick={this.toggleColor}>
					Toggle color
					{JSON.stringify({ color })}
				</button>
				<button onClick={this.toggleUpdate}>
					Should update?
					{JSON.stringify({ dontUpdate })}
				</button>
				<button onClick={this.toggleUnmount}>
					Should unmount?
					{JSON.stringify({ unmount })}
				</button>
			</React.Fragment>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('[role="main"]'),
)
