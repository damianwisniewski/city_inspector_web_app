import React, { Component } from 'react'
// import PropTypes from 'prop-types'

const { REACT_APP_TITLE } = process.env

class Settings extends Component {
	componentDidMount() {
		document.title = `404 - Not Found | ${REACT_APP_TITLE}`
	}

	render() {
		return <div id='NotFound'>404 - NOT FOUND</div>
	}
}

// Settings.propTypes = {}

export default Settings
