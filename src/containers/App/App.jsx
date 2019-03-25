import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// Styles
import './App.scss'

import Navbar from '../Navbar/Navbar'
import MapView from '../MapView/MapView'
import NewNotification from '../NewNotification/NewNotification'
import Settings from '../Settings/Settings'
import Subscription from '../Subscription/Subscription'
import YourNotification from '../YourNotification/YourNotification'
import NotFound from '../NotFound/NotFound'

class App extends Component {
	static defaultProps = {
		isUserAuth: false,
	}

	createAuthRoutes = () => (
		<Switch>
			<Route exact path='/' component={MapView} />
			<Route component={NotFound} />
		</Switch>
	)

	createRoutes = () => (
		<Switch>
			<Route exact path='/' component={MapView} />
			<Route exact path='/nowe_zgloszenie' component={NewNotification} />
			<Route exact path='/twoje_zgloszenia' component={YourNotification} />
			<Route exact path='/subskrypcje' component={Subscription} />
			<Route exact path='/ustawienia' component={Settings} />
			<Route component={NotFound} />
		</Switch>
	)

	render() {
		const { isUserAuth } = this.props

		return (
			<BrowserRouter>
				<div className='App'>
					<Navbar />
					<div className='content'>
						{isUserAuth ? this.createAuthRoutes() : this.createRoutes()}
					</div>
				</div>
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
