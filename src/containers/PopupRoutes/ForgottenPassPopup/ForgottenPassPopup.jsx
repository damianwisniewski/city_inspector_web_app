import React, { Component } from 'react'
import { connect } from 'react-redux'

import './ForgottenPassPopup.scss'

import { Form, Input } from '../../../components/FormComponents'
import Button from '../../../components/CommonComponents/Button/Button'
import Status from '../../../components/CommonComponents/Status/Status'
import RequestStatus from '../../../components/CommonComponents/RequestStatus/RequestStatus'

// actions
import {
	sagaPassRemind,
	resetPassRemindRequestStatus,
} from '../../../reduxStore/actionCreators/requestActions'

class ForgottenPassPopup extends Component {
	state = {
		email: '',
	}

	componentDidMount() {
		this.props.resetPassRemindRequestStatus()
	}

	handleRemainPass = e => {
		e.preventDefault()
		this.props.sagaPassRemind(this.state.email)
	}

	handleInputChanges = e => {
		this.setState({
			email: e.target.value,
		})
	}

	render() {
		const { passReminderRequestStatus, closePopup } = this.props
		const { email } = this.state

		return (
			<div id='reminder-popup' className='reminder'>
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
						floatingLabel
						type='email'
						autocomplete='email'
						pattern='.+@.+'
						required
					/>
					<RequestStatus size='small' requestState={passReminderRequestStatus}>
						<Status
							id='reminder-status'
							type='correct'
							position='vertical'
							message='Jeśli podałeś poprawny email, przypomnienie zostało wysłane'
						/>
					</RequestStatus>
					<div className='reminder__buttons-wrapper'>
						<Button id='reminder-close-button' color='white' onClick={closePopup}>
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

const mapStateToProps = state => ({
	passReminderRequestStatus: state.requests.passReminderRequestStatus,
})

export default connect(
	mapStateToProps,
	{
		sagaPassRemind,
		resetPassRemindRequestStatus,
	},
)(ForgottenPassPopup)
