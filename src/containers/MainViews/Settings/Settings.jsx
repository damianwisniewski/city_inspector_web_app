import React, { Component } from 'react'
import { connect } from 'react-redux'

// SCSS
import './Settings.scss'

// Components
import { Form, Input, Checkbox, Group, Radio } from '../../../components/FormComponents'
import { Button, RequestStatus, Status } from '../../../components/CommonComponents'

// Actions
import {
	removeUserAuthData,
	setTokenExpired,
} from '../../../reduxStore/actionCreators/userDataActions'

// Components
import { ConfirmModal } from '../../../components/CommonComponents'

// Others
import { Requester } from '../../../services/requester/requester'

class Settings extends Component {
	state = {
		fetchingData: 'pending',
		isDeleteConfirmModalOpen: false,
		deleteRequestInProgress: 'initial',
		updateUserRequest: 'initial',

		// user data
		email: '',
		password: '',
		repeatedPassword: '',
		emailAgreement: '',
		nickname: '',
		firstname: '',
		lastname: '',
		city: '',

		// changed user data
		changed: {},
	}

	repeatPassInput = React.createRef()

	componentDidMount() {
		document.title = `Ustawienia | ${process.env.REACT_APP_TITLE}`

		Requester.send('getUserData')
			.then(res => {
				this.setState({ ...res, fetchingData: 'succeeded' })
			})
			.catch(() => {
				this.setState({ fetchingData: 'failed' })
			})
	}

	/**
	 * Opens modal to confirm or cancel delete account
	 */
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

	/**
	 * Handler for input changes.
	 * Saves provided input values in state
	 * and in "changed" object to update proper user data in database
	 * @param {Event} e
	 */
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

	/**
	 * Sends new user data to update if anything changed
	 * @param {Event} e
	 */
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

			// User data
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
								<Input
									id='settings-nickname-field'
									label='Pseudonim: '
									autoComplete='nickname'
									labelType='solid'
									value={nickname}
									disabled
								/>
								<Input
									id='settings-email-field'
									data-type='email'
									onChange={this.handleInputChanges}
									label='E-mail: '
									autoComplete='email'
									labelType='solid'
									type='email'
									pattern='.+@.+'
									value={email}
								/>
							</div>

							<Group name='Zmiana hasła'>
								<Input
									id='settings-password-field'
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
									id='settings-repeat-password-field'
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
									id='settings-name-field'
									data-type='name'
									onChange={this.handleInputChanges}
									label='Imię: '
									autoComplete='given-name'
									labelType='solid'
									value={name}
									type='text'
								/>
								<Input
									id='settings-lastname-field'
									data-type='surname'
									onChange={this.handleInputChanges}
									label='Nazwisko: '
									autoComplete='family-name'
									labelType='solid'
									value={surname}
									type='text'
								/>
								<Input
									id='settings-city-field'
									data-type='city'
									onChange={this.handleInputChanges}
									label='Miasto: '
									autoComplete='address-level2'
									labelType='solid'
									value={city}
									type='text'
								/>
							</div>
							<div>
								<Group name='Płeć' onChange={this.handleInputChanges}>
									<Radio
										id='settings-gender-field-1'
										data-type='gender'
										name='gender'
										value='M'
										label='Mężczyzna'
										defaultChecked={gender === 'M'}
									/>
									<Radio
										id='settings-gender-field-2'
										data-type='gender'
										name='gender'
										value='F'
										label='Kobieta'
										defaultChecked={gender === 'F'}
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
				{isDeleteConfirmModalOpen && (
					<ConfirmModal onCancel={this.onCloseConfirmModal} onConfirm={this.onConfirmDeleteAccount}>
						<ConfirmModal.Header>Uwaga!</ConfirmModal.Header>
						<ConfirmModal.Content>
							Czy jesteś pewien ze chcesz usuniąc konto? Operacja jest nieodrwacalna!!!
							<div className='update-status-wrapper'>
								<RequestStatus size='small' requestState={deleteRequestInProgress} />
							</div>
						</ConfirmModal.Content>
					</ConfirmModal>
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
