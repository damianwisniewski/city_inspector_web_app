import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import { Form, Input } from '../../../components/FormComponents'
import Button from '../../../components/CommonComponents/Button/Button'

import './LoginPopup.scss'
// import Status from '../../../components/CommonComponents/Status/Status'

class LoginPopup extends Component {
	state = {
		forgottenPassword: false,
		loginFailed: false,
	}

	handleForgottenPassword = () => {
		this.setState({
			forgottenPassword: true,
		})
	}

	render() {
		const { closePopup } = this.props
		const { forgottenPassword } = this.state

		if (forgottenPassword) {
			return (
				<div id='LoginPopup' className='login'>
					<h2 className='login__header'>Resetowanie hasła</h2>
					<p className='login__description'>
						Podaj adres e-mail na który zarejestrowane jest konto
					</p>
					<Form>
						<Input
							id='email-field'
							label='e-mail'
							placeholder='Wpisz tutaj swój email...'
							floatingLabel
							type='email'
							autocomplete='email'
							pattern='.+@.+'
							required
						/>
						<div className='login__buttons-wrapper'>
							<Button id='inform-close-button' color='white' onClick={closePopup}>
								Anuluj
							</Button>
							<Button id='submit-button' type='submit' color='blue'>
								Resetuj
							</Button>
						</div>
					</Form>
				</div>
			)
		} else {
			return (
				<div id='LoginPopup' className='login'>
					<h2 className='login__header'>Logowanie</h2>
					{/* <Status id='login-status' type='error' message='Niepoprawny email lub hasło' /> */}
					<p className='login__description'>Wpisz następujące dane aby się zalogować</p>
					<Form>
						<Input
							id='email-field'
							label='e-mail'
							placeholder='Wpisz tutaj swój email...'
							floatingLabel
							type='email'
							autocomplete='username'
							pattern='.+@.+'
							required
						/>
						<Input
							id='password-field'
							label='hasło'
							placeholder='Podaj hasło...'
							floatingLabel
							type='password'
							autocomplete='current-password'
							required
						/>
						<Button
							id='forgotten-pass-button'
							type='text'
							color='blue'
							onClick={this.handleForgottenPassword}
						>
							Zapomniałeś hasła?
						</Button>
						<div className='login__buttons-wrapper'>
							<Button id='inform-close-button' color='white' onClick={closePopup}>
								Anuluj
							</Button>
							<Button id='submit-button' type='submit' color='blue'>
								Zaloguj
							</Button>
						</div>
					</Form>
				</div>
			)
		}
	}
}

// LoginPopup.propTypes = {}

export default LoginPopup
