import React, { Component } from 'react'
// import PropTypes from 'prop-types'

const { REACT_APP_TITLE } = process.env

class Subscription extends Component {
	componentDidMount() {
		document.title = `Subskrypcje | ${REACT_APP_TITLE}`
	}

	render() {
		return <div id='Subscription'>Subscription</div>
	}
}

// Subscription.propTypes = {}

export default Subscription
