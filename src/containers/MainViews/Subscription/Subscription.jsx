import React, { Component } from 'react'

class Subscription extends Component {
	componentDidMount() {
		document.title = `Subskrypcje | ${process.env.REACT_APP_TITLE}`
	}

	render() {
		return <div id='Subscription'>Subscription</div>
	}
}

export default Subscription
