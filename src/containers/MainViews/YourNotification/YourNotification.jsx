import React, { Component } from 'react'
// import PropTypes from 'prop-types'

const { REACT_APP_TITLE } = process.env

class YourNotification extends Component {
	componentDidMount() {
		document.title = `Twoje zgłoszenia | ${REACT_APP_TITLE}`
	}

	render() {
		return <div id='YourNotification'>YourNotification</div>
	}
}

// YourNotification.propTypes = {}

export default YourNotification
