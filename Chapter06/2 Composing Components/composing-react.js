import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Header from './component/Header'
import Footer from './component/Footer'
import Description from './component/Description'

const App = () => (
	<React.Fragment>
		<Header title="React App" />
		<Description />
		<Footer date={new Date().toDateString()} />
	</React.Fragment>
)

ReactDOM.render(
	<App />,
	document.querySelector('[role="main"]'),
)
