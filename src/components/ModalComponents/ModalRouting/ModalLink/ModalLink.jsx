import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ModalContext } from '../ModalRouter/ModalRouter'

class ModalLink extends Component {
	static contextType = ModalContext

	render() {
		const { children, to, activeClassName, className, ...props } = this.props
		const { handleOpenModal, componentName } = this.context

		return (
			<button
				{...props}
				data-to={to}
				onClick={handleOpenModal}
				className={`${className} ${activeClassName && to === componentName ? activeClassName : ''}`}
			>
				{children}
			</button>
		)
	}
}

ModalLink.propTypes = {
	children: PropTypes.node,
	to: PropTypes.string.isRequired,
}

export default ModalLink
