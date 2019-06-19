import React from 'react'
import PropTypes from 'prop-types'

import './NavButton.scss'

import { ModalLink } from '../../ModalComponents/ModalRouting'

const NavButton = ({ color, ...rest }) => (
	<li className='nav-button-wrapper'>
		<ModalLink {...rest} className={`nav-button ${color}`} />
	</li>
)

NavButton.propTypes = {
	color: PropTypes.string,
}

export default NavButton
