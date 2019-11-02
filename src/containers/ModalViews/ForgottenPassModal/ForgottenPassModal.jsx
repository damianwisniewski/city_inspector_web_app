import React, { Component } from 'react'

// SCSS
import './ForgottenPassModal.scss'

// Components
import { Form, Input } from '../../../components/FormComponents'
import { Button, Status, RequestStatus } from '../../../components/CommonComponents'

// Others
import { Requester } from '../../../services/requester/requester'

class ForgottenPassModal extends Component {
	state = {
		sendRequestStatus: 'initial',
		email: '',
	}

	/**
	 * Sends requests for initialize remains password procedure
	 * User will receive mail with reset password link
	 * @param {Event} e
	 */
	handleRemainPass = e => {
		e.preventDefault()

		this.setState({ sendRequestStatus: 'pending' })

		Requester.send('initResetPassword', { body: { email: this.state.email } })
			.then(() => {
				this.setState({ sendRequestStatus: 'succeeded' })
			})
			.catch(() => {
				this.setState({ sendRequestStatus: 'failed' })
			})
	}

	/**
	 * Handler for input changes.
	 * Sets their values in state
	 * @param {Event} e
	 */
	handleInputChanges = e => {
		this.setState({
			email: e.target.value,
		})
	}

	render() {
		const { closeModal } = this.props
		const { email, sendRequestStatus } = this.state

		return (
			<div id='reminder-Modal' className='reminder'>
				<h2 className='reminder__header'>Resetowanie hasła</h2>
				<p className='reminder__description'>
					Podaj adres e-mail na który zarejestrowane jest konto
				</p>
				<Form onSubmit={this.handleRemainPass}>
					<Input
						id='reminder-email-field'
						onChange={this.handleInputChanges}
						value={email}
						label='e-mail'
						placeholder='Wpisz tutaj swój email...'
						labelType='floating'
						type='email'
						autocomplete='email'
						pattern='.+@.+'
						required
					/>
					<RequestStatus size='medium' requestState={sendRequestStatus}>
						<Status
							id='reminder-status'
							type='correct'
							position='vertical'
							message='Jeśli podałeś poprawny email, przypomnienie zostało wysłane'
						/>
					</RequestStatus>
					<div className='reminder__buttons-wrapper'>
						<Button id='reminder-close-button' color='white' onClick={closeModal}>
							Anuluj
						</Button>
						<Button id='reminder-submit-button' type='submit' color='blue'>
							Resetuj
						</Button>
					</div>
				</Form>
			</div>
		)
	}
}

export default ForgottenPassModal
