import React from 'react'
import PropTypes from 'prop-types'

import './Popup.scss'
import CloseButton from '../CloseButton/CloseButton'
import Overlay from '../Overlay/Overlay'

const Popup = ({ darkOverlay, closeButton, onButtonClose, onOverlayClick, children }) => {
	return (
		<Overlay onOverlayClick={onOverlayClick} dark={darkOverlay || false}>
			<div className='popup-container'>
				{closeButton && <CloseButton onClose={onButtonClose} />}
				{children}
			</div>
		</Overlay>
	)
}

Popup.propTypes = {
	darkOverlay: PropTypes.bool,
	children: PropTypes.element.isRequired,
	closeButton: PropTypes.bool,
	onClose: PropTypes.func,
}

export default Popup
