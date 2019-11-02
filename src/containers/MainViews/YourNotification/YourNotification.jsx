import React, { Component } from 'react'

class YourNotification extends Component {
	componentDidMount() {
		document.title = `Twoje zgłoszenia | ${process.env.REACT_APP_TITLE}`
	}

	render() {
		return <div id='YourNotification'>YourNotification</div>
	}
}

export default YourNotification
