import React, { Component } from 'react'
import PropTypes from 'prop-types'
export const PopupContext = React.createContext()

class PopupRouter extends Component {
	state = {
		componentName: '',
	}

	handleClosePopup = () => {
		this.setState({ componentName: '' })
	}

	handleOpenPopup = e => {
		if (e.target) {
			this.setState({ componentName: e.target.dataset.to })
		} else {
			this.setState({ componentName: e })
		}
	}

	render() {
		const { children } = this.props
		const { componentName } = this.state

		return (
			<PopupContext.Provider
				value={{
					componentName,
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
