import React, { Component } from 'react'
import { connect } from 'react-redux'

import './LoginModal.scss'

import { Form, Input } from '../../../components/FormComponents'
import Button from '../../../components/CommonComponents/Button/Button'
import Status from '../../../components/CommonComponents/Status/Status'
import RequestStatus from '../../../components/CommonComponents/RequestStatus/RequestStatus'
import { ModalRedirect } from '../../../components/ModalComponents/ModalRouting'

// actions
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

	handleForgottenPassword = () => {
		this.setState({ forgottenPass: true })
	}

	handleInputChanges = e => {
		const field = e.target.dataset.type

		this.setState({
			[field]: e.target.value,
		})
	}

	handleUserLogin = e => {
		e.preventDefault()

		const { email, password } = this.state
		this.props.sagaRequestLogin({ email, password })
	}

	render() {
		const { isUserAuth, loginRequestState, closeModal } = this.props
		const { email, password, forgottenPass } = this.state

		if (forgottenPass) {
			return <ModalRedirect to='ForgottenPassModal' />
		}

		return (
			<div id='login-Modal' className='login'>
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
						floatingLabel
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
						floatingLabel
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
