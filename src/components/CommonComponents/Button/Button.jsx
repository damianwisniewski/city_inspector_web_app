import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = ({ color, className, type, children, category, onClick, ...props }) => (
	<button
		{...props}
		type={type}
		onClick={onClick}
		className={`${category === 'text' ? 'text-button' : 'button'} ${color} ${className}`}
	>
		{children}
	</button>
)

Button.defaultProps = {
	color: 'white',
	children: '',
	className: '',
	type: 'button',
	category: 'button',
	onClick: () => {},
}

Button.propTypes = {
	color: PropTypes.oneOf(['white', 'blue', 'green', 'red']),
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.string,
	category: PropTypes.oneOf(['button', 'text']),
}

export default Button
