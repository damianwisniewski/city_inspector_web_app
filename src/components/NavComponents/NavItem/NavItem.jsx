import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './NavItem.scss'
import iconAssets from '../../../assets/styleModules/icons.module.scss'
import { PopupLink } from '../../PopupComponents/PopupRouting'

const NavItem = ({ id, children, type, className, icon, exact, to }) => {
	function createProperChild() {
		if (type === 'link') {
			return (
				<NavLink
					id={id}
					type={type}
					exact={exact}
					to={to}
					activeClassName='navigation_active'
					className={`nav_link ${iconAssets[icon]} ${className} `}
				>
					{children}
				</NavLink>
			)
		} else {
			return (
				<PopupLink
					id={id}
					type={type}
					to={to}
					activeClassName='navigation_active'
					className={`nav_button ${iconAssets[icon]} ${className} `}
				>
					{children}
				</PopupLink>
			)
		}
	}

	return <li className='nav_item'>{createProperChild()}</li>
}

NavItem.defaultProps = {
	children: '',
	icon: '',
	exact: false,
	className: '',
}

NavItem.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	icon: PropTypes.string,
	exact: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.oneOf(['link', 'button']).isRequired,
	to: PropTypes.string.isRequired,
}

export default NavItem
