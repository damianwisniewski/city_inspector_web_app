import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import { Form, Input, Group, Checkbox } from '../../../components/FormComponents'
import Button from '../../../components/CommonComponents/Button/Button'

import './SignupPopup.scss'

// import Status from '../../../components/CommonComponents/Status/Status'

class SignupPopup extends Component {
	render() {
		const { closePopup } = this.props

		return (
			<div id='SignupPopup' className='signup'>
				<h2 className='signup__header'>Rejestracja</h2>
				{/* <Status id='signup-status' type='error' message='Niepoprawny email lub hasło' /> */}
				<p className='signup__description'>Wpisz następujące dane aby się zarejestrować</p>
				<Form className='signup__form'>
					{/* Required data */}
					<div className='signup__required'>
						<Input
							id='email-field'
							label='E-mail*'
							placeholder='Podaj swój adres email...'
							floatingLabel
							type='email'
							autoComplete='username'
							pattern='.+@.+'
							required
						/>
						<Input
							id='password-field'
							label='Hasło*'
							placeholder='Podaj hasło...'
							floatingLabel
							type='password'
							name='password'
							autoComplete='new-password'
							required
						/>
						<Input
							id='repeat-password-field'
							label='Powtórz hasło*'
							placeholder='Powtórz hasło...'
							floatingLabel
							type='password'
							autoComplete='current-password'
							required
						/>
						<Input
							id='nickname-field'
							label='Nickname*'
							placeholder='Podaj swój adres email...'
							floatingLabel
							type='text'
							autoComplete='username'
							pattern='.+@.+'
							required
						/>
					</div>
					{/* Optionals data */}
					<Group name='opcjonalnie'>
						<Input
							id='name-field'
							label='Imię'
							placeholder='Podaj swoje imię...'
							floatingLabel
							type='text'
							autoComplete='given-name'
						/>
						<Input
							id='surname-field'
							label='Nazwisko'
							placeholder='Podaj swoje nazwisko...'
							floatingLabel
							type='text'
							autoComplete='family-name'
						/>
						<Input
							id='city-field'
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
					{/* Buttons*/}
					<div className='signup__buttons-wrapper'>
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

// SignupPopup.propTypes = {}

export default SignupPopup
