import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// Styles
import './App.scss'

// Containers
import Navbar from '../Navbar/Navbar'

// Modal Routing
import { ModalRouter, ModalSwitch, ModalRoute } from '../../components/ModalComponents/ModalRouting'

// Routes
import mainRoutes from '../../routes/mainRoutes'
import modalRoutes from '../../routes/modalRoutes'

// HOC
import withAuth from '../../hocs/withAuth/withAuth'

// redux actions
import { checkSession } from '../../reduxStore/actionCreators/requestActions'
import RequestStatus from '../../components/CommonComponents/RequestStatus/RequestStatus'

class App extends Component {
	static defaultProps = {
		isUserAuth: false,
	}

	componentDidMount() {
		this.props.onCheckSession()
	}

	render() {
		return (
			<RequestStatus
				requestState={this.props.isCheckSessionInProgress}
				fullview
				color='blue'
				size='large'
				direction='vertical'
			>
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
			</RequestStatus>
		)
	}
}

function mapStateToProps(state) {
	return {
		isUserAuth: state.user.isUserAuth,
		isCheckSessionInProgress: state.requests.checkSessionStatus,
	}
}

const mapDispatchToProps = {
	onCheckSession: checkSession,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App)
