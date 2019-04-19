import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Navbar.scss'
import iconAssets from '../../assets/styleModules/icons.module.scss'

import logo from '../../assets/images/logo.svg'

import NavItem from '../../components/NavComponents/NavItem/NavItem'
import NavButton from '../../components/NavComponents/NavButton/NavButton'

class Navbar extends Component {
	static defaultProps = {
		isUserAuth: false,
	}

	state = {
		isDrawerOpen: false,
	}

	onClickDrawerToggle = () => this.setState({ isDrawerOpen: !this.state.isDrawerOpen })

	/**
	 * Close drawer after click nav item.
	 * Do not changes drawer state if it's closed (bigger screens)
	 * Do not changes drawer state after click nav item parent
	 */
	onClickMenuOption = e => {
		e.stopPropagation()
		const drawerState = this.state.isDrawerOpen

		if (drawerState && e.target.type) {
			this.setState({ isDrawerOpen: false })
		}
	}

	createAuthNavigation = () => {
		const { isDrawerOpen } = this.state

		return (
			<ul
				id='navList'
				onClick={this.onClickMenuOption}
				className={`navigation_list ${isDrawerOpen ? 'opened' : ''}`}
			>
				<NavItem id='mapLink' exact icon='map' type='link' to='/'>
					Mapa
				</NavItem>
				<NavItem id='plusLink' exact icon='plus' type='link' to='/nowe_zgloszenie'>
					Nowe zgłoszenie
				</NavItem>
				<NavItem id='pinLink' exact icon='pin' type='link' to='/twoje_zgloszenia'>
					Twoje zgłoszenia
				</NavItem>
				<NavItem id='eyeLink' exact icon='eye' type='link' to='/subskrypcje'>
					Subskrypcje
				</NavItem>
				<NavItem id='bellLink' icon='bell' type='button' to='Settings'>
					Powiadomienia
				</NavItem>
				<NavItem id='cogsLink' exact icon='cogs' type='link' to='/ustawienia'>
					Ustawienia
				</NavItem>
				<NavItem id='logoutLink' icon='logout' type='button' to='LogoutPopup'>
					Wyloguj
				</NavItem>
			</ul>
		)
	}

	createNavigation = () => {
		const { isDrawerOpen } = this.state

		return (
			<ul
				id='navList'
				onClick={this.onClickMenuOption}
				className={`navigation_list ${isDrawerOpen ? 'opened' : ''}`}
			>
				<NavItem id='mapLink' exact icon='map' type='link' to='/'>
					Mapa
				</NavItem>
				<NavItem id='helpLink' icon='help' type='button' to='HelpPopup'>
					Pomoc
				</NavItem>
				<NavButton id='registerButton' color='white' to='SignupPopup'>
					Rejestracja
				</NavButton>
				<NavButton id='loginButton' color='blue' to='LoginPopup'>
					Logowanie
				</NavButton>
			</ul>
		)
	}

	render() {
		const { isUserAuth } = this.props

		return (
			<nav className='navigation'>
				<img src={logo} className='logo' alt='logo' />
				{isUserAuth ? this.createAuthNavigation() : this.createNavigation()}
				<button
					id='menuToggleButton'
					onClick={this.onClickDrawerToggle}
					className={`navigation_menu_button ${iconAssets.menu}`}
				/>
			</nav>
		)
	}
}

function mapStateToProps(state) {
	return {
		isUserAuth: state.user.isUserAuth,
	}
}

export default connect(mapStateToProps)(Navbar)
