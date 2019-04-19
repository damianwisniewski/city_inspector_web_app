import { Component } from 'react'
import PropTypes from 'prop-types'
import { PopupContext } from '../PopupRouter/PopupRouter'

class PopupRedirect extends Component {
	static contextType = PopupContext

	componentDidMount() {
		this.context.handleOpenPopup(this.props.to)
	}

	render() {
		return null
	}
}

PopupRedirect.propTypes = {
	to: PropTypes.string.isRequired,
}

export default PopupRedirect
