import React, { Component } from 'react'

// SCSS
import './SignupModal.scss'

// Components
import { Form, Input, Group, Checkbox, Radio } from '../../../components/FormComponents'
import { Button, Status, RequestStatus } from '../../../components/CommonComponents'

// Others
import { Requester } from '../../../services/requester/requester'

class SignupModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			requestState: 'initial',

			// Data to signup
			email: '',
			password: '',
			repeatedPassword: '',
			emailAgreement: '',
			gender: '',
			nickname: '',
			firstname: '',
			lastname: '',
			city: '',
		}

		this.repeatPassInput = React.createRef()
	}

	/**
	 * Compares passwords and shows validity popup when they are different.
	 * Invalidates form in this way, when passwords are different.
	 */
	comparePasswords = () => {
		if (this.state.password !== this.state.repeatedPassword) {
			this.repeatPassInput.setCustomValidity('Hasła muszą być identyczne!')
		} else {
			this.repeatPassInput.setCustomValidity('')
		}
	}

	/**
	 * Sends request request with provided data to register user.
	 */
	registerUser = e => {
		e.preventDefault()

		// filter out requestState param and empty values
		const dataToSend = Object.entries(this.state).filter(
			([key, value]) => value && key !== 'requestState',
		)

		this.setState({ requestState: 'pending' })

		Requester.send('registerUser', { body: dataToSend })
			.then(() => {
				this.setState({ requestState: 'succeeded' })
			})
			.catch(() => {
				this.setState({ requestState: 'failed' })
			})
	}

	/**
	 * Handler for input changes to update component state
	 */
	handleInputChanges = e => {
		const field = e.target.dataset.type
		const isPassInput = field === 'password' || field === 'repeatedPassword'
		const isAgreementField = field === 'emailAgreement'

		this.setState({
			[field]: isAgreementField ? (e.target.checked ? 'Y' : 'N') : e.target.value,
		})

		if (isPassInput) {
			this.comparePasswords()
		}
	}

	render() {
		const { closeModal } = this.props
		const {
			city,
			email,
			firstname,
			lastname,
			nickname,
			password,
			gender,
			emailAgreement,
			repeatedPassword,
			requestState,
		} = this.state

		return (
			<div id='SignupModal' className='signup'>
				<h2 className='signup__header'>Rejestracja</h2>
				<p className='signup__description'>Wpisz następujące dane aby się zarejestrować</p>

				<Form className='signup__form' onSubmit={this.registerUser}>
					{/* Required data */}
					<div className='signup__required'>
						<Input
							id='email-field'
							data-type='email'
							onChange={this.handleInputChanges}
							value={email}
							label='E-mail*'
							placeholder='Podaj swój adres email...'
							labelType='floating'
							type='email'
							pattern='.+@.+'
							autoComplete='email'
							required
						/>
						<Input
							id='password-field'
							data-type='password'
							onChange={this.handleInputChanges}
							onBlur={this.comparePasswords}
							value={password}
							label='Hasło*'
							placeholder='Podaj hasło...'
							labelType='floating'
							type='password'
							name='password'
							autoComplete='new-password'
							minLength='6'
							maxLength='12'
							required
						/>
						<Input
							inputRef={ref => (this.repeatPassInput = ref)}
							id='repeat-password-field'
							data-type='repeatedPassword'
							onChange={this.handleInputChanges}
							onBlur={this.comparePasswords}
							value={repeatedPassword}
							label='Powtórz hasło*'
							placeholder='Powtórz hasło...'
							labelType='floating'
							type='password'
							autoComplete='new-password'
							minLength='6'
							maxLength='12'
							required
						/>
						<Input
							id='nickname-field'
							data-type='nickname'
							onChange={this.handleInputChanges}
							value={nickname}
							label='Nickname*'
							placeholder='Podaj swój adres email...'
							labelType='floating'
							type='text'
							required
						/>
					</div>

					{/* Optionals data */}
					<Group name='opcjonalnie'>
						<Input
							id='name-field'
							data-type='firstname'
							onChange={this.handleInputChanges}
							value={firstname}
							label='Imię'
							placeholder='Podaj swoje imię...'
							labelType='floating'
							type='text'
							autoComplete='given-name'
						/>
						<Input
							id='lastname-field'
							data-type='lastname'
							onChange={this.handleInputChanges}
							value={lastname}
							label='Nazwisko'
							placeholder='Podaj swoje nazwisko...'
							labelType='floating'
							type='text'
							autoComplete='family-name'
						/>
						<Input
							id='city-field'
							data-type='city'
							onChange={this.handleInputChanges}
							value={city}
							label='Miasto'
							placeholder='Podaj swoje miasto...'
							labelType='floating'
							type='text'
							name='city'
							autoComplete='address-level2'
						/>
						<Group name='Płeć' onChange={this.handleInputChanges}>
							<Radio
								data-type='gender'
								name='gender'
								value='M'
								label='Mężczyzna'
								checked={gender === 'M'}
							/>
							<Radio
								data-type='gender'
								name='gender'
								value='F'
								label='Kobieta'
								checked={gender === 'F'}
							/>
						</Group>
					</Group>

					{/* Agreement checkbox */}
					<div className='signup__agreements-wrapper'>
						<Checkbox
							id='emailAgreement'
							data-type='emailAgreement'
							name='emailAgreement'
							checked={emailAgreement === 'Y'}
							onChange={this.handleInputChanges}
							label='Czy wyrażasz zgodę na otrzymywanie informacji mailowych od serwisu "City Inspector", dotyczących zmian w serwisie oraz aktualizacji zgłoszeń.'
						/>
					</div>

					{/* Agreement checkbox */}
					<div className='signup__request-status'>
						<RequestStatus size='small' requestState={requestState}>
							<Status
								id='login-status'
								type='correct'
								message='Konto zostało utworzone, możesz się zalogować'
							/>
						</RequestStatus>
					</div>

					{/* Buttons*/}
					<div className='signup__buttons-wrapper'>
						<Button id='inform-close-button' color='white' onClick={closeModal}>
							Anuluj
						</Button>
						<Button id='submit-button' type='submit' color='blue'>
							Zarejestruj
						</Button>
					</div>
				</Form>
			</div>
		)
	}
}

export default SignupModal
