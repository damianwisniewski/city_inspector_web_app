import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import { ModalRedirect } from '../../components/ModalComponents/ModalRouting'

export default function withAuth(WrappedComponent) {
	const mapStateToProps = state => ({
		isUserAuth: state.user.isUserAuth,
		isTokenExpired: state.user.isTokenExpired,
		expireMessage: state.user.expireMessage,
	})

	return connect(mapStateToProps)(
		class extends Component {
			render() {
				return this.props.isUserAuth ? (
					<WrappedComponent {...this.props} />
				) : (
					<Fragment>
						<Redirect to='/' />
						<ModalRedirect
							message={
								(this.props.isTokenExpired && this.props.expireMessage) ||
								'Nie masz dostępu do tych zasobów. Aby korzystać w pełni z aplikacji musisz się zalogować!'
							}
							to='LoginModal'
						/>
					</Fragment>
				)
			}
		},
	)
}
