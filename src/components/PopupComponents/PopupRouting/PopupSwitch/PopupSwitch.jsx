import React from 'react'
import PropTypes from 'prop-types'
import { PopupContext } from '../PopupRouter/PopupRouter'

const PopupSwitch = props => {
	const findChosenElement = ({ componentName }) => {
		const { children } = props

		if (componentName && children) {
			if (Array.isArray(children)) {
				return children.find(({ props }) => props.path === componentName) || null
			}

			return children.props.path === componentName ? children : null
		}

		return null
	}

	return (
		<div>
			<PopupContext.Consumer>{findChosenElement}</PopupContext.Consumer>
		</div>
	)
}

PopupSwitch.propTypes = {
	children: PropTypes.node.isRequired,
}

export default PopupSwitch
