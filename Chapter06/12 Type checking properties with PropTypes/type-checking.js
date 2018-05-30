import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as propTypes from 'prop-types'

class Toggle extends React.Component {
	static propTypes = {
		condition: propTypes.any.isRequired,
		children: (props, propName, componentName) => {
			const customPropTypes = {
				children: propTypes
					.arrayOf(propTypes.element)
					.isRequired
			}
			const isArrayOfElements = propTypes
				.checkPropTypes(
					customPropTypes,
					props,
					propName,
					componentName,
			)
			const children = props[propName]
			const count = React.Children.count(children)
			if (isArrayOfElements instanceof Error) {
				return isArrayOfElements
			} else if (count !== 2) {
				return new Error(
					`"${componentName}"` +
					` expected ${propName}` +
					` to contain exactly 2 React elements`
				)
			}
		}
	}
	render() {
		const { condition, children } = this.props
		return condition ? children[0] : children[1]
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = { value: false }
		this.onClick = this.onClick.bind(this)
	}
	onClick() {
		this.setState(({ value }) => ({
			value: !value,
		}))
	}
	render() {
		const { value } = this.state
		return (
			<React.Fragment>
				<Toggle condition={value}>
					<p style={{ color: 'blue' }}>Blue!</p>
					<p style={{ color: 'lime' }}>Lime!</p>
					<p style={{ color: 'pink' }}>Pink!</p>
				</Toggle>
				<button onClick={this.onClick}>
					Toggle Colors
				</button>
			</React.Fragment>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('[role="main"]'),
)
