import './Overlay.scss'
import React from 'react'
import PropTypes from 'prop-types'

const Overlay = ({ dark, onOverlayClick, children }) => {
	const handleClick = e => {
		if (e.target.id === 'overlay') {
			onOverlayClick()
		}
	}

	return (
		<div
			id='overlay'
			onClick={handleClick}
			className={`popup-overlay ${dark ? 'dark' : 'transparent'}`}
		>
			{children}
		</div>
	)
}

Overlay.propTypes = {
	dark: PropTypes.bool.isRequired,
	onOverlayClick: PropTypes.func,
	children: PropTypes.element.isRequired,
}

export default Overlay
