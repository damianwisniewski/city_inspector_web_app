import React from 'react'

import './NavButton.scss'

import { PopupLink } from '../../PopupComponents/PopupRouting'

const NavButton = props => (
	<li className='nav-button-wrapper'>
		<PopupLink className={`nav-button ${props.color}`} {...props} />
	</li>
)

export default NavButton
