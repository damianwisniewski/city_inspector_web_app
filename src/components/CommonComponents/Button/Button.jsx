import React from 'react'
import PropTypes from 'prop-types'

// SCSS
import './Button.scss'

const Button = ({ color, className, type, children, category, size, onClick, ...props }) => (
	<button
		{...props}
		type={type}
		onClick={onClick}
		className={`${
			category === 'text' ? 'text-button' : 'button'
		} button--${size} ${color} ${className}`}
	>
		{children}
	</button>
)

Button.defaultProps = {
	color: 'white',
	size: 'medium',
	children: '',
	className: '',
	type: 'button',
	category: 'button',
	onClick: () => {},
}

Button.propTypes = {
	color: PropTypes.oneOf(['white', 'blue', 'green', 'red']),
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.string,
	category: PropTypes.oneOf(['button', 'text']),
}

export default Button
