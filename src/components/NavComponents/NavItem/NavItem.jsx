import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './NavItem.scss'
import iconAssets from '../../../assets/styleModules/icons.module.scss'
import { ModalLink } from '../../ModalComponents/ModalRouting'

const NavItem = ({ children, type, className, icon, exact, to, ...rest }) => {
	function createProperChild() {
		if (type === 'link') {
			return (
				<NavLink
					{...rest}
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
				<ModalLink
					{...rest}
					type={type}
					to={to}
					activeClassName='navigation_active'
					className={`nav_button ${iconAssets[icon]} ${className} `}
				>
					{children}
				</ModalLink>
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
	children: PropTypes.node,
	icon: PropTypes.string,
	exact: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.oneOf(['link', 'button']).isRequired,
	to: PropTypes.string.isRequired,
}

export default NavItem
