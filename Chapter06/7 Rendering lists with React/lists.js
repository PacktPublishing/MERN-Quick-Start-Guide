import * as React from 'react'
import * as ReactDOM from 'react-dom'

const MapArray = ({
	from,
	mapToProps,
	children: Child,
}) => (
	<React.Fragment>
		{from.map((item) => (
			<Child {...mapToProps(item)} />
		))}
	</React.Fragment>
)
const TodoItem = ({ done, label }) => (
	<li>
		<input type="checkbox" checked={done} readOnly />
		<label>{label}</label>
	</li>
)
const list = [
	{ id: 1, done: true, title: 'Study for Chinese exam' },
	{ id: 2, done: false, title: 'Take a shower' },
	{ id: 3, done: false, title: 'Finish chapter 6' },
]
const mapToProps = ({ id: key, done, title: label }) => ({
	key,
	done,
	label,
})
const TodoListApp = ({ items }) => (
	<ol>
		<MapArray from={list} mapToProps={mapToProps}>
			{TodoItem}
		</MapArray>
	</ol>
)

ReactDOM.render(
	<TodoListApp items={list} />,
	document.querySelector('[role="main"]'),
)
