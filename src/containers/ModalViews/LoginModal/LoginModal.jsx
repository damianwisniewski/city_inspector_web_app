import React, { Component } from 'react'
import { connect } from 'react-redux'

// SCSS
import './LoginModal.scss'

// Components
import { Form, Input } from '../../../components/FormComponents'
import { Button, Status, RequestStatus } from '../../../components/CommonComponents'
import { ModalRedirect } from '../../../components/ModalComponents/ModalRouting'

// Actions
import {
	sagaRequestLogin,
	resetLoginRequestStatus,
} from '../../../reduxStore/actionCreators/requestActions'

class LoginModal extends Component {
	state = {
		forgottenPass: false,
		email: '',
		password: '',
	}

	componentDidMount() {
		this.props.resetLoginRequestStatus()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isUserAuth) {
			this.props.closeModal()
		}
	}

	/**
	 * Handler for forgotten password button click
	 * Sets forgottenPass state to true and redirects to ForgottenPassModal
	 */
	handleForgottenPassword = () => {
		this.setState({ forgottenPass: true })
	}

	/**
	 * Handler for input changes.
	 * Sets their values in state
	 * @param {Event} e
	 */
	handleInputChanges = e => {
		const field = e.target.dataset.type

		this.setState({
			[field]: e.target.value,
		})
	}

	/**
	 * Sends provided credentials to saga responsible for login user
	 * @param {Event} e
	 */
	handleUserLogin = e => {
		e.preventDefault()

		const { email, password } = this.state
		this.props.sagaRequestLogin({ email, password })
	}

	render() {
		const { isUserAuth, loginRequestState, closeModal } = this.props
		const { email, password, forgottenPass } = this.state

		// Redirects to forgotten password modal
		if (forgottenPass) {
			return <ModalRedirect to='ForgottenPassModal' />
		}

		return (
			<div id='login-modal' className='login'>
				<h2 className='login__header'>Logowanie</h2>
				<p className='login__description'>Wpisz następujące dane aby się zalogować</p>
				<Form onSubmit={this.handleUserLogin}>
					<Input
						id='login-email-field'
						data-type='email'
						onChange={this.handleInputChanges}
						value={email}
						label='e-mail'
						placeholder='Wpisz tutaj swój email...'
						labelType='floating'
						type='email'
						autoComplete='username'
						pattern='.+@.+'
						required
					/>
					<Input
						id='login-password-field'
						data-type='password'
						onChange={this.handleInputChanges}
						value={password}
						label='hasło'
						placeholder='Podaj hasło...'
						labelType='floating'
						type='password'
						autoComplete='current-password'
						required
					/>
					<Button
						id='login-forgotten-pass-button'
						category='text'
						color='blue'
						onClick={this.handleForgottenPassword}
					>
						Zapomniałeś hasła?
					</Button>
					<div className='login__request-status'>
						<RequestStatus size='small' requestState={loginRequestState}>
							{isUserAuth ? (
								<Status id='login-status' type='correct' message='Jesteś zalogowany' />
							) : (
								<Status id='login-status' type='error' message='Niepoprawny email lub hasło' />
							)}
						</RequestStatus>
					</div>
					<div className='login__buttons-wrapper'>
						<Button id='login-close-button' color='white' onClick={closeModal}>
							Anuluj
						</Button>
						<Button id='login-submit-button' type='submit' color='blue'>
							Zaloguj
						</Button>
					</div>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isUserAuth: state.user.isUserAuth,
	loginRequestState: state.requests.loginRequestStatus,
})

export default connect(
	mapStateToProps,
	{
		sagaRequestLogin,
		resetLoginRequestStatus,
	},
)(LoginModal)
