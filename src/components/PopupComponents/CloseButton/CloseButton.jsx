import './CloseButton.scss'
import icons from '../../../assets/styleModules/icons.module.scss'
import React from 'react'
import PropTypes from 'prop-types'

const CloseButton = ({ onClose }) => (
	<button id='popupCloseButton' onClick={onClose} className={`close-button ${icons.exit}`} />
)

CloseButton.propTypes = {
	onClose: PropTypes.func.isRequired,
}

export default CloseButton
