import React from 'react'
import PropTypes from 'prop-types'
import { PopupContext } from '../PopupRouter/PopupRouter'

const PopupSwitch = props => {
	const findChosenElement = ({ componentName }) => {
		const { children } = props

		if (componentName && children) {
			let PopupToRender

			if (Array.isArray(children)) {
				PopupToRender = children.find(({ props }) => props.path === componentName) || null
			} else {
				PopupToRender = children.props.path === componentName ? children : null
			}

			return PopupToRender
		}

		return null
	}

	return <PopupContext.Consumer>{findChosenElement}</PopupContext.Consumer>
}

PopupSwitch.propTypes = {
	children: PropTypes.node.isRequired,
}

export default PopupSwitch
