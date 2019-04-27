import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'

import { PopupRedirect } from '../../components/PopupComponents/PopupRouting'
import { isUserAuth } from '../../reduxStore/reducers/userDataReducer'

export default function withAuth(WrappedComponent) {
	return class extends Component {
		render() {
			return isUserAuth() ? (
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
	}
}