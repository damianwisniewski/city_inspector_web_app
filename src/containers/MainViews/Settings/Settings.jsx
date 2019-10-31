import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Settings.scss'

import { Form, Input, Checkbox, Group, Radio } from '../../../components/FormComponents'
import Button from '../../../components/CommonComponents/Button/Button'
import RequestStatus from '../../../components/CommonComponents/RequestStatus/RequestStatus'
import Status from '../../../components/CommonComponents/Status/Status'
import Modal from '../../../components/ModalComponents/Modal/Modal'

import { Requester } from '../../../services/requester/requester'

import {
	removeUserAuthData,
	setTokenExpired,
} from '../../../reduxStore/actionCreators/userDataActions'

const { REACT_APP_TITLE } = process.env

class Settings extends Component {
	state = {
		fetchingData: 'pending',
		isDeleteConfirmModalOpen: false,
		deleteRequestInProgress: 'initial',
		updateUserRequest: 'initial',

		// data
		email: '',
		password: '',
		repeatedPassword: '',
		emailAgreement: '',
		nickname: '',
		firstname: '',
		lastname: '',
		city: '',

		// changes user data
		changed: {},
	}

	repeatPassInput = React.createRef()

	componentDidMount() {
		document.title = `Ustawienia | ${REACT_APP_TITLE}`

		Requester.send('getUserData')
			.then(res => {
				this.setState({ ...res, fetchingData: 'succeeded' })
			})
			.catch(() => {
				this.setState({ fetchingData: 'failed' })
			})
	}

	onDeleteAccountClick = () => {
		this.setState({ isDeleteConfirmModalOpen: true })
	}

	onCloseConfirmModal = () => {
		this.setState({ isDeleteConfirmModalOpen: false })
	}

	onConfirmDeleteAccount = () => {
		this.setState({ deleteRequestInProgress: 'pending' })

		Requester.send('deleteUser')
			.then(() => {
				this.props.history.push('/')
				this.props.clearAuthData()
			})
			.catch(() => {
				this.setState({ deleteRequestInProgress: 'failed' })
			})
	}

	comparePasswords = () => {
		if (this.state.password !== this.state.repeatedPassword) {
			this.repeatPassInput.setCustomValidity('Hasła muszą być identyczne!')
		} else {
			this.repeatPassInput.setCustomValidity('')
		}
	}

	handleInputChanges = e => {
		const field = e.target.dataset.type
		const isPassInput = field === 'password' || field === 'repeatedPassword'
		const isAgreementField = field === 'emailAgreement'

		const changedProperty = {
			[field]: isAgreementField ? (e.target.checked ? 'Y' : 'N') : e.target.value,
		}

		this.setState({
			...changedProperty,
			changed: { ...this.state.changed, ...changedProperty },
		})

		if (isPassInput) {
			this.comparePasswords()
		}
	}

	onSubmitData = e => {
		e.preventDefault()

		if (Object.keys(this.state.changed).length) {
			this.setState({ updateUserRequest: 'pending' })

			Requester.send('updateUserData', { body: this.state.changed })
				.then(() => {
					const emailChanged = this.state.changed.email
					const passwordChanged = this.state.changed.password

					this.setState({ updateUserRequest: 'succeeded', changed: {} })

					if (emailChanged || passwordChanged) {
						this.props.setTokenExpired('Po zmianie email lub hasła należy zalogować się ponownie')
					}
				})
				.catch(() => {
					this.setState({ updateUserRequest: 'failed' })
				})
		}
	}

	render() {
		const {
			fetchingData,
			isDeleteConfirmModalOpen,
			deleteRequestInProgress,
			updateUserRequest,
			emailAgreement,
			nickname,
			name,
			email,
			city,
			surname,
			gender,
			password,
			repeatedPassword,
		} = this.state

		return (
			<RequestStatus
				requestState={fetchingData}
				fullview
				color='blue'
				size='large'
				direction='vertical'
			>
				<div id='Settings' className='settings'>
					<h2 className='settings__header'>Twoje dane:</h2>
					<Form onSubmit={this.onSubmitData}>
						<div className='settings__row'>
							<div>
								<Input label='Pseudonim: ' labelType='solid' value={nickname} disabled />
								<Input
									id='email-field'
									data-type='email'
									onChange={this.handleInputChanges}
									label='E-mail: '
									labelType='solid'
									type='email'
									pattern='.+@.+'
									value={email}
								/>
							</div>

							<Group name='Zmiana hasła'>
								<Input
									id='password-field'
									data-type='password'
									onChange={this.handleInputChanges}
									label='Nowe hasło: '
									labelType='solid'
									placeholder='Wpisz nowe hasło'
									type='password'
									name='password'
									autoComplete='new-password'
									minLength='6'
									maxLength='12'
									value={password}
								/>
								<Input
									inputRef={ref => (this.repeatPassInput = ref)}
									id='repeat-password-field'
									data-type='repeatedPassword'
									onChange={this.handleInputChanges}
									label='Potwórz hasło: '
									labelType='solid'
									placeholder='Powtórz hasło'
									type='password'
									autoComplete='new-password'
									minLength='6'
									maxLength='12'
									value={repeatedPassword}
								/>
							</Group>
						</div>
						<div className='settings__row'>
							<div>
								<Input
									id='name-field'
									data-type='name'
									onChange={this.handleInputChanges}
									label='Imię: '
									labelType='solid'
									value={name}
									type='text'
								/>
								<Input
									id='lastname-field'
									data-type='surname'
									onChange={this.handleInputChanges}
									label='Nazwisko: '
									labelType='solid'
									value={surname}
									type='text'
								/>
								<Input
									id='city-field'
									data-type='city'
									onChange={this.handleInputChanges}
									label='Miasto: '
									labelType='solid'
									value={city}
									type='text'
								/>
							</div>
							<div>
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
								<Checkbox
									id='emailAgreement'
									data-type='emailAgreement'
									name='emailAgreement'
									checked={emailAgreement === 'Y'}
									onChange={this.handleInputChanges}
									label='Czy wyrażasz zgodę na otrzymywanie informacji mailowych od serwisu "City Inspector", dotyczących zmian w serwisie oraz aktualizacji zgłoszeń.'
								/>
							</div>
						</div>

						<div className='update-status-wrapper'>
							<RequestStatus size='small' requestState={updateUserRequest}>
								<Status type='correct' message='Dane zostały zaktualizowane' />
							</RequestStatus>
						</div>

						<Button type='submit' color='blue'>
							Zapisz
						</Button>
					</Form>

					<Group name='Usunięcie konta'>
						<p>
							Aby usunąć konto kliknij poniszy przycisk "Usuń konto". Pamiętaj jednak że ustracisz
							wszystkie dane na tym koncie, a operacja jest nieodwracalna!
						</p>
						<Button onClick={this.onDeleteAccountClick} color='red'>
							Usuń konto
						</Button>
					</Group>
				</div>

				{/* Confirm deletion modal */}
				{isDeleteConfirmModalOpen && (
					<Modal
						darkOverlay
						closeButton
						onButtonClose={this.onCloseConfirmModal}
						onOverlayClick={this.onCloseConfirmModal}
					>
						<section className='delete__confirm'>
							<h2 className='delete__confirm__header'>Uwaga!</h2>
							<p className='delete__confirm__context'>
								Czy jesteś pewien ze chcesz usuniąc konto? Operacja jest nieodrwacalna!!!
							</p>

							<div className='update-status-wrapper'>
								<RequestStatus size='small' requestState={deleteRequestInProgress} />
							</div>
							<div className='delete__confirm__buttons-wrapper'>
								<Button color='white' onClick={this.onCloseConfirmModal}>
									Anuluj
								</Button>
								<Button color='red' onClick={this.onConfirmDeleteAccount}>
									Tak
								</Button>
							</div>
						</section>
					</Modal>
				)}
			</RequestStatus>
		)
	}
}

export default connect(
	null,
	{
		clearAuthData: removeUserAuthData,
		setTokenExpired,
	},
)(Settings)
