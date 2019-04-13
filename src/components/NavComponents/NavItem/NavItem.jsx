import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import './NavItem.scss'
import iconAssets from '../../../assets/styleModules/icons.module.scss'

const NavItem = ({ id, children, type, className, icon, action, exact, to }) => {
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
				<button
					id={id}
					type={type}
					onClick={action}
					className={`nav_button ${iconAssets[icon]} ${className} `}
				>
					{children}
				</button>
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
	action: () => {},
}

NavItem.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	icon: PropTypes.string,
	exact: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.oneOf(['link', 'button']).isRequired,
	action: PropTypes.func,
	to: function(props, propName) {
		if (props.type === 'button' && props[propName]) {
			return new Error(
				`VERIFICATION FAILED!
				You cannot specify property 'to' for NavItem type 'button'`,
			)
		}
	},
}

export default NavItem
