import React, { Component } from 'react'
// import PropTypes from 'prop-types'

const { REACT_APP_TITLE } = process.env

class MapView extends Component {
	componentDidMount() {
		document.title = `Mapa | ${REACT_APP_TITLE}`
	}

	render() {
		return <div id='MapView'>{REACT_APP_TITLE}</div>
	}
}

// MapView.propTypes = {}

export default MapView
