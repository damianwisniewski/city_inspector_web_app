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
			className={`popup-overlay ${dark ? 'popup-overlay--dark' : 'popup-overlay--transparent'}`}
		>
			{children}
		</div>
	)
}

Overlay.defaultProps = {
	dark: false,
	onOverlayClick: () => {},
}

Overlay.propTypes = {
	dark: PropTypes.bool,
	onOverlayClick: PropTypes.func,
	children: PropTypes.element.isRequired,
}

export default Overlay
