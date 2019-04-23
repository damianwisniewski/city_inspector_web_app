import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// Styles
import './App.scss'

// Popup Routing
import { PopupRouter, PopupSwitch, PopupRoute } from '../../components/PopupComponents/PopupRouting'

import withAuth from '../../HOCs/withAuth/withAuth'

// Routes
import Navbar from '../Navbar/Navbar'
import MapView from '../Routes/MapView/MapView'
import NewNotification from '../Routes/NewNotification/NewNotification'
import Settings from '../Routes/Settings/Settings'
import Subscription from '../Routes/Subscription/Subscription'
import YourNotification from '../Routes/YourNotification/YourNotification'
import NotFound from '../Routes/NotFound/NotFound'

// PopupRoutes
import HelpPopup from '../PopupRoutes/HelpPopup/HelpPopup'
import LoginPopup from '../PopupRoutes/LoginPopup/LoginPopup'
import SignupPopup from '../PopupRoutes/SignupPopup/SignupPopup'
import LogoutPopup from '../PopupRoutes/LogoutPopup/LogoutPopup'

class App extends Component {
	static defaultProps = {
		isUserAuth: false,
	}

	render() {
		return (
			<BrowserRouter>
				<PopupRouter>
					<div className='App'>
						<Navbar />
						<main className='content'>
							<Switch>
								<Route exact path='/' component={MapView} />
								<Route exact path='/nowe_zgloszenie' component={withAuth(NewNotification)} />
								<Route exact path='/twoje_zgloszenia' component={withAuth(YourNotification)} />
								<Route exact path='/subskrypcje' component={withAuth(Subscription)} />
								<Route exact path='/ustawienia' component={withAuth(Settings)} />
								<Route component={NotFound} />
							</Switch>
						</main>
						<PopupSwitch>
							<PopupRoute darkOverlay closeButton path='HelpPopup' component={HelpPopup} />
							<PopupRoute darkOverlay closeButton path='LoginPopup' component={LoginPopup} />
							<PopupRoute darkOverlay closeButton path='SignupPopup' component={SignupPopup} />
							<PopupRoute darkOverlay closeButton path='LogoutPopup' component={LogoutPopup} />
						</PopupSwitch>
					</div>
				</PopupRouter>
			</BrowserRouter>
		)
	}
}

function mapStateToProps(state) {
	return {
		isUserAuth: state.user.isUserAuth,
	}
}

export default connect(mapStateToProps)(App)
