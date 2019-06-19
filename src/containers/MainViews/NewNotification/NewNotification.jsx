import React, { Component } from 'react'
// import PropTypes from 'prop-types'

const { REACT_APP_TITLE } = process.env

class NewNotification extends Component {
	componentDidMount() {
		document.title = `Nowe zgłoszenie | ${REACT_APP_TITLE}`
	}

	render() {
		return <div id='NewNotification'>NewNotification</div>
	}
}

// NewNotification.propTypes = {}

export default NewNotification
