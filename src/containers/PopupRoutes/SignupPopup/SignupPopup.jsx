import React, { Component } from 'react'
import { connect } from 'react-redux'

import './SignupPopup.scss'

import { Form, Input, Group, Checkbox } from '../../../components/FormComponents'
import Button from '../../../components/CommonComponents/Button/Button'
import Status from '../../../components/CommonComponents/Status/Status'
import RequestStatus from '../../../components/CommonComponents/RequestStatus/RequestStatus'

// actions
import {
	sagaRequestRegister,
	resetRequestRegisterStatus,
} from '../../../reduxStore/actionCreators/requestActions'

class SignupPopup extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			repeatedPassword: '',
			nickname: '',
			firstname: '',
			lastname: '',
			city: '',
		}

		this.repeatPassInput = React.createRef()
	}

	componentDidMount() {
		this.props.resetRequestRegisterStatus()
	}

	comparePasswords = () => {
		if (this.state.password !== this.state.repeatedPassword) {
			this.repeatPassInput.setCustomValidity('Hasła muszą być identyczne!')
		} else {
			this.repeatPassInput.setCustomValidity('')
		}
	}

	registerUser = e => {
		e.preventDefault()
		this.props.sagaRequestRegister(this.state)
	}

	handleInputChanges = e => {
		const field = e.target.dataset.type
		const isPassInput = field === 'password' || field === 'repeatedPassword'

		this.setState({
			[field]: e.target.value,
		})

		if (isPassInput) {
			this.comparePasswords()
		}
	}

	render() {
		const { closePopup, registerRequestStatus } = this.props
		const { city, email, firstname, lastname, nickname, password, repeatedPassword } = this.state

		return (
			<div id='SignupPopup' className='signup'>
				<h2 className='signup__header'>Rejestracja</h2>
				{/* <Status id='signup-status' type='error' message='Niepoprawny email lub hasło' /> */}
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
							floatingLabel
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
							floatingLabel
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
							floatingLabel
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
							floatingLabel
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
							floatingLabel
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
							floatingLabel
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
							floatingLabel
							type='text'
							name='city'
							autoComplete='address-level2'
						/>
					</Group>
					{/* Agreements checkbox */}
					<div className='signup__agreements-wrapper'>
						<Checkbox
							id='agreement_1'
							label='Czy wyrażasz zgodę na otrzymywanie informacji mailowych od serwisu "City Inspector", dotyczących zmian w serwisie oraz aktualizacji zgłoszeń.'
						/>
						<Checkbox
							id='agreement_2'
							label='Czy twoje dane takie jak e-mail, imię i nazwisko oraz miasto, mają być widocznie dla innych zarejestowanych użytkowników.'
						/>
					</div>
					<RequestStatus size='small' requestState={registerRequestStatus}>
						<Status
							id='login-status'
							type='correct'
							message='Konto zostało utworzone, możesz się zalogować'
						/>
					</RequestStatus>
					{/* Buttons*/}
					<div className='signup__buttons-wrapper'>
						<Button id='inform-close-button' color='white' onClick={closePopup}>
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

const mapStateToProps = state => ({
	registerRequestStatus: state.requests.registerRequestStatus,
})

export default connect(
	mapStateToProps,
	{
		sagaRequestRegister,
		resetRequestRegisterStatus,
	},
)(SignupPopup)
