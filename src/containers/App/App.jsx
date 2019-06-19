import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// Styles
import './App.scss'

import Navbar from '../Navbar/Navbar'

// Modal Routing
import { ModalRouter, ModalSwitch, ModalRoute } from '../../components/ModalComponents/ModalRouting'

// Routes
import mainRoutes from '../../routes/mainRoutes'
import modalRoutes from '../../routes/modalRoutes'

import withAuth from '../../HOCs/withAuth/withAuth'

class App extends Component {
	static defaultProps = {
		isUserAuth: false,
	}

	render() {
		return (
			<BrowserRouter>
				<ModalRouter>
					<div className='App'>
						<Navbar />
						<main className='content'>
							<Switch>
								{mainRoutes.map(route => {
									if (!route.path) {
										return <Route key={route.path || 'NotFound'} component={route.component} />
									}

									return (
										<Route
											key={route.path || 'NotFound'}
											exact={route.exact}
											path={route.path}
											component={route.authNeeded ? withAuth(route.component) : route.component}
										/>
									)
								})}
							</Switch>
						</main>
						<ModalSwitch>
							{modalRoutes.map(route => (
								<ModalRoute
									key={route.path || 'NotFound'}
									darkOverlay={route.darkOverlay}
									closeButton={route.closeButton}
									path={route.path}
									component={route.component}
								/>
							))}
						</ModalSwitch>
					</div>
				</ModalRouter>
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
