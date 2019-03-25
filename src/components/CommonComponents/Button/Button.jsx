import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = ({ id, color, className, type, children, onClick }) => (
	<button id={id} type={type} onClick={onClick} className={`custom-button ${color} ${className}`}>
		{children}
	</button>
)

Button.defaultProps = {
	color: 'white',
	children: '',
	className: '',
	type: 'button',
	onClick: () => {},
}

Button.propTypes = {
	color: PropTypes.oneOf(['white', 'blue', 'green', 'red']),
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.string,
}

export default Button
