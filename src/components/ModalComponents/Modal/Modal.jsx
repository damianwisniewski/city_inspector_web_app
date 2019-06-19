import React from 'react'
import PropTypes from 'prop-types'

import './Modal.scss'
import CloseButton from '../CloseButton/CloseButton'
import Overlay from '../Overlay/Overlay'

const Modal = ({ darkOverlay, closeButton, onButtonClose, onOverlayClick, message, children }) => {
	return (
		<Overlay onOverlayClick={onOverlayClick} dark={darkOverlay || false}>
			<div className='Modal-container'>
				{message && <p className='Modal-container__extra-message'>{message}</p>}
				{closeButton && <CloseButton onClose={onButtonClose} />}
				{children}
			</div>
		</Overlay>
	)
}

Modal.propTypes = {
	darkOverlay: PropTypes.bool,
	children: PropTypes.element.isRequired,
	closeButton: PropTypes.bool,
	onClose: PropTypes.func,
}

export default Modal
