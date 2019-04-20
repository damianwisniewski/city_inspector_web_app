import React, { Component } from 'react'
import PropTypes from 'prop-types'
export const PopupContext = React.createContext()

class PopupRouter extends Component {
	state = {
		componentName: '',
		additionalProps: {},
	}

	handleClosePopup = () => {
		this.setState({
			componentName: '',
			additionalProps: {},
		})
	}

	handleOpenPopup = (e, additionalProps = {}) => {
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
			<PopupContext.Provider
				value={{
					componentName,
					additionalProps,
					handleClosePopup: this.handleClosePopup,
					handleOpenPopup: this.handleOpenPopup,
				}}
			>
				{children}
			</PopupContext.Provider>
		)
	}
}

PopupRouter.propTypes = {
	children: PropTypes.node,
}

export default PopupRouter
