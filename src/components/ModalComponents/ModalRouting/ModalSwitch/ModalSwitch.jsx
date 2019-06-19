import React from 'react'
import PropTypes from 'prop-types'
import { ModalContext } from '../ModalRouter/ModalRouter'

const ModalSwitch = props => {
	const findChosenElement = ({ componentName }) => {
		const { children } = props

		if (componentName && children) {
			let ModalToRender

			if (Array.isArray(children)) {
				ModalToRender = children.find(({ props }) => props.path === componentName) || null
			} else {
				ModalToRender = children.props.path === componentName ? children : null
			}

			return ModalToRender
		}

		return null
	}

	return <ModalContext.Consumer>{findChosenElement}</ModalContext.Consumer>
}

ModalSwitch.propTypes = {
	children: PropTypes.node.isRequired,
}

export default ModalSwitch
