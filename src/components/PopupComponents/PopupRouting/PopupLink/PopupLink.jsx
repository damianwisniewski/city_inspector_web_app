import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PopupContext } from '../PopupRouter/PopupRouter'

class PopupLink extends Component {
	static contextType = PopupContext

	render() {
		const { children, to, activeClassName, className, ...props } = this.props
		const { handleOpenPopup, componentName } = this.context

		return (
			<button
				{...props}
				data-to={to}
				onClick={handleOpenPopup}
				className={`${className} ${activeClassName && to === componentName ? activeClassName : ''}`}
			>
				{children}
			</button>
		)
	}
}

PopupLink.propTypes = {
	children: PropTypes.node,
	to: PropTypes.string.isRequired,
}

export default PopupLink
