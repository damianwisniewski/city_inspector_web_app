import React, { Component } from 'react'
import { connect } from 'react-redux'

// SCSS
import './Navbar.scss'
import iconAssets from '../../assets/styleModules/icons.module.scss'

// Images
import logo from '../../assets/images/logo.svg'

// Components
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

	/**
	 * Creates navigation buttons for authorized user
	 */
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
				<NavItem id='bellLink' icon='bell' type='button' to='NotificationChangesModal'>
					Powiadomienia
				</NavItem>
				<NavItem id='cogsLink' exact icon='cogs' type='link' to='/ustawienia'>
					Ustawienia
				</NavItem>
				<NavItem id='logoutLink' icon='logout' type='button' to='LogoutModal'>
					Wyloguj
				</NavItem>
			</ul>
		)
	}

	/**
	 * Creates navigation buttons for non-authorized user
	 */
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
				<NavItem id='helpLink' icon='help' type='button' to='HelpModal'>
					Pomoc
				</NavItem>
				<NavButton id='registerButton' color='white' to='SignupModal'>
					Rejestracja
				</NavButton>
				<NavButton id='loginButton' color='blue' to='LoginModal'>
					Logowanie
				</NavButton>
			</ul>
		)
	}

	render() {
		const { isUserAuth } = this.props

		return (
			<nav className='navigation'>
				<div className='navigation__container'>
					<img src={logo} className='logo' alt='logo' />
					{/* For better readability, list theme for different auth state were split to functions */}
					{isUserAuth ? this.createAuthNavigation() : this.createNavigation()}
					<button
						id='menuToggleButton'
						onClick={this.onClickDrawerToggle}
						className={`navigation_menu_button ${iconAssets.menu}`}
					/>
				</div>
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
