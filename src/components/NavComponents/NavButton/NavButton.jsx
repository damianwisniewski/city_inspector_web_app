import React from 'react'
import PropTypes from 'prop-types'

import './NavButton.scss'

import Button from '../../CommonComponents/Button/Button'

const NavButton = props => (
	<li className='nav-button'>
		<Button {...props} onClick={props.action}>
			{props.children}
		</Button>
	</li>
)

NavButton.propTypes = {
	action: PropTypes.func.isRequired,
}

export default NavButton
