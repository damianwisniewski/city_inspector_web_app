import React from 'react'

import './NavButton.scss'

import { ModalLink } from '../../ModalComponents/ModalRouting'

const NavButton = props => (
	<li className='nav-button-wrapper'>
		<ModalLink className={`nav-button ${props.color}`} {...props} />
	</li>
)

export default NavButton
