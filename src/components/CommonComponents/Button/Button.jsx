import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = ({ color, className, type, children, onClick, ...props }) => (
	<button
		{...props}
		type={type}
		onClick={onClick}
		className={`${type === 'text' ? 'text-button' : 'button'} ${color} ${className}`}
	>
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
