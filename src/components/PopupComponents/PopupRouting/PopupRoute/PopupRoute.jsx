import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PopupContext } from '../PopupRouter/PopupRouter'
import Popup from '../../Popup/Popup'

class PopupRoute extends Component {
	static contextType = PopupContext

	render() {
		const { component, closeButton, darkOverlay } = this.props
		const { handleClosePopup, additionalProps } = this.context

		return (
			<Popup
				closeButton={closeButton}
				darkOverlay={darkOverlay}
				onOverlayClick={handleClosePopup}
				onButtonClose={handleClosePopup}
				{...additionalProps}
			>
				{React.createElement(component, { closePopup: handleClosePopup })}
			</Popup>
		)
	}
}

PopupRoute.defaultProps = {
	closeButton: false,
	darkOverlay: false,
}

PopupRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
	closeButton: PropTypes.bool,
	darkOverlay: PropTypes.bool,
}

export default PopupRoute
