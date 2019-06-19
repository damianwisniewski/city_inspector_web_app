import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ModalContext } from '../ModalRouter/ModalRouter'
import Modal from '../../Modal/Modal'

class ModalRoute extends Component {
	static contextType = ModalContext

	render() {
		const { component, closeButton, darkOverlay } = this.props
		const { handleCloseModal, additionalProps } = this.context

		return (
			<Modal
				closeButton={closeButton}
				darkOverlay={darkOverlay}
				onOverlayClick={handleCloseModal}
				onButtonClose={handleCloseModal}
				{...additionalProps}
			>
				{React.createElement(component, { closeModal: handleCloseModal })}
			</Modal>
		)
	}
}

ModalRoute.defaultProps = {
	closeButton: false,
	darkOverlay: false,
}

ModalRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
	closeButton: PropTypes.bool,
	darkOverlay: PropTypes.bool,
}

export default ModalRoute
