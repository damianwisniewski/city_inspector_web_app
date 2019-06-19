import React, { Component } from 'react'
import PropTypes from 'prop-types'
export const ModalContext = React.createContext()

class ModalRouter extends Component {
	state = {
		componentName: '',
		additionalProps: {},
	}

	handleCloseModal = () => {
		this.setState({
			componentName: '',
			additionalProps: {},
		})
	}

	handleOpenModal = (e, additionalProps = {}) => {
		if (e.target) {
			this.setState({ componentName: e.target.dataset.to, additionalProps })
		} else {
			this.setState({ componentName: e, additionalProps })
		}
	}

	render() {
		const { children } = this.props
		const { componentName, additionalProps } = this.state

		return (
			<ModalContext.Provider
				value={{
					componentName,
					additionalProps,
					handleCloseModal: this.handleCloseModal,
					handleOpenModal: this.handleOpenModal,
				}}
			>
				{children}
			</ModalContext.Provider>
		)
	}
}

ModalRouter.propTypes = {
	children: PropTypes.node,
}

export default ModalRouter
