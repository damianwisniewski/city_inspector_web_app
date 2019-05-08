import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import { PopupRedirect } from '../../components/PopupComponents/PopupRouting'

export default function withAuth(WrappedComponent) {
	const mapStateToProps = state => ({
		isUserAuth: state.user.isUserAuth,
	})

	return connect(mapStateToProps)(
		class extends Component {
			render() {
				return this.props.isUserAuth ? (
					<WrappedComponent {...this.props} />
				) : (
					<Fragment>
						<Redirect to='/' />
						<PopupRedirect
							message='Nie masz dostępu do tych zasobów. Aby korzystać w pełni z aplikacji musisz się zalogować!'
							to='LoginPopup'
						/>
					</Fragment>
				)
			}
		},
	)
}
