import React from 'react'

import './NavButton.scss'

import Button from '../../CommonComponents/Button/Button'

const NavButton = ({ action, ...props }) => (
	<li className='nav-button'>
		<Button {...props} onClick={action} />
	</li>
)

export default NavButton
