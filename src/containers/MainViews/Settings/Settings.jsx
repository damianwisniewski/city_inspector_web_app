import React, { Component } from 'react'
// import PropTypes from 'prop-types'

const { REACT_APP_TITLE } = process.env

class Settings extends Component {
	componentDidMount() {
		document.title = `Ustawienia | ${REACT_APP_TITLE}`
	}

	render() {
		return <div id='Settings'>Settings</div>
	}
}

// Settings.propTypes = {}

export default Settings
