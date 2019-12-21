import React, { Component } from 'react'

// SCSS
import './YourNotification.scss'
import styles from '../../../assets/styleModules/icons.module.scss'

// Components
import {
	RequestStatus,
	ConfirmModal,
	Table,
	SearchField,
	Loader,
} from '../../../components/CommonComponents'

// Others
import { Requester } from '../../../services/requester/requester'

class YourNotification extends Component {
	static categories = {
		Numer: 'id',
		Typ: 'category',
		Miasto: 'city',
		Tytuł: 'title',
		'Data zgłoszenia': 'createdAt',
		Status: 'status',
	}

	state = {
		notifications: [],
		selectedValues: [],
		notifyToDelete: null,
		getNotificationRequestStatus: 'initial',
		deleteRequestInProgress: 'initial',
		isDeleteConfirmModalOpen: false,
		// change resreshTimestamp to fetch notification again
		refreshTimestamp: Date.now(),
	}

	componentDidMount() {
		document.title = `Twoje zgłoszenia | ${process.env.REACT_APP_TITLE}`

		/**
		 * Get all notification that own
		 */
		this.setState(
			{
				getNotificationRequestStatus: 'pending',
			},
			() => {
				Requester.send('getAllOwnNotification')
					.then(res =>
						this.setState({
							notifications: res,
							getNotificationRequestStatus: 'succeeded',
						}),
					)
					.catch(() =>
						this.setState({
							getNotificationRequestStatus: 'error',
						}),
					)
			},
		)
	}

	componentDidUpdate(prevProps, prevState) {
		const { selectedValues } = this.state

		if (
			prevState.selectedValues !== this.state.selectedValues ||
			prevState.refreshTimestamp !== this.state.refreshTimestamp
		) {
			const requestQueries = {}
			selectedValues.forEach(element => {
				const category = YourNotification.categories[element.searchCategory]
				requestQueries[category] = element.searchContent
			})

			/**
			 * Get all notification that own
			 */
			this.setState(
				{
					getNotificationRequestStatus: 'pending',
				},
				() => {
					Requester.send('getAllOwnNotification', {
						queries: requestQueries,
					})
						.then(res =>
							this.setState({
								notifications: res,
								getNotificationRequestStatus: 'succeeded',
							}),
						)
						.catch(() => {
							this.setState({
								getNotificationRequestStatus: 'error',
							})
						})
				},
			)
		}
	}

	handleSubmitSearchValue = ({ selectedValues }) => {
		this.setState({ selectedValues })
	}

	/**
	 * Opens modal to confirm deletion of notification
	 */
	handleRemoveClick = e => {
		const rowElement = e.currentTarget.parentNode.parentNode
		const idField = Array.from(rowElement.children).find(child => child.dataset.name === 'Numer')
		const id = idField && idField.textContent

		if (id) {
			this.setState({ isDeleteConfirmModalOpen: true, notifyToDelete: id })
		}
	}

	/**
	 * Removes notification
	 */
	handleRemoveConfirmClick = () => {
		this.setState({ deleteRequestInProgress: 'pending' })

		Requester.send('deleteNotification', {
			params: {
				notificationId: this.state.notifyToDelete,
			},
		})
			.then(() => {
				this.setState({
					isDeleteConfirmModalOpen: false,
					notifyToDelete: null,
					deleteRequestInProgress: 'initial',
					refreshTimestamp: Date.now(),
				})
			})
			.catch(() => {
				this.setState({ deleteRequestInProgress: 'error' })
			})
	}

	/**
	 * Removes notification
	 */
	handleCloseModalClick = () => {
		this.setState({
			isDeleteConfirmModalOpen: false,
			notifyToDelete: null,
			deleteRequestInProgress: 'initial',
		})
	}

	/**
	 * Redirects to page with full information of notification
	 */
	handleToNotifyClick = e => {
		const rowElement = e.currentTarget.parentNode.parentNode
		const idField = Array.from(rowElement.children).find(child => child.dataset.name === 'Numer')
		const id = idField && idField.textContent

		this.props.history.push(`/zgloszenie/${id}`)
	}

	/**
	 * Prepares interesting values for table
	 */
	PrepareValues = item => [
		item.id,
		item.category,
		item.city,
		item.title,
		item.createdAt,
		item.status,
	]

	render() {
		const {
			notifications,
			isDeleteConfirmModalOpen,
			deleteRequestInProgress,
			getNotificationRequestStatus,
		} = this.state

		return (
			<div id='YourNotification' className='your-notification'>
				<SearchField
					categories={Object.keys(YourNotification.categories)}
					onSearchChange={this.handleSubmitSearchValue}
				/>
				<Table noWrap scrollable>
					<Table.Header>
						<Table.Row>
							{[...Object.keys(YourNotification.categories), 'Akcje'].map((header, index) => (
								<Table.Cell key={`header_${index}`} section='header'>
									{header}
								</Table.Cell>
							))}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{getNotificationRequestStatus === 'pending' && (
							<Table.Row>
								<Table.Cell
									className='no-after-label'
									colSpan={Object.keys(YourNotification.categories).length + 1}
								>
									<Loader />
								</Table.Cell>
							</Table.Row>
						)}
						{getNotificationRequestStatus !== 'pending' &&
							(notifications.length ? (
								notifications.map((row, rowIndex) => (
									<Table.Row key={`row_${rowIndex}`}>
										{this.PrepareValues(row).map((cell, cellIndex) => (
											<Table.Cell
												key={`cell_${rowIndex}_${cellIndex}`}
												name={Object.keys(YourNotification.categories)[cellIndex]}
											>
												{cell}
											</Table.Cell>
										))}
										<Table.Cell className='your-notification__actions'>
											<span onClick={this.handleRemoveClick} className={styles.remove} />
											<span onClick={this.handleToNotifyClick} className={styles['go-to']} />
										</Table.Cell>
									</Table.Row>
								))
							) : (
								<Table.Row>
									<Table.Cell
										className='no-after-label'
										colSpan={Object.keys(YourNotification.categories).length + 1}
									>
										Brak zgłoszeń...
									</Table.Cell>
								</Table.Row>
							))}
					</Table.Body>
				</Table>

				{isDeleteConfirmModalOpen && (
					<ConfirmModal
						onCancel={this.handleCloseModalClick}
						onConfirm={this.handleRemoveConfirmClick}
					>
						<ConfirmModal.Header>Uwaga!</ConfirmModal.Header>
						<ConfirmModal.Content>
							Czy jesteś pewien ze chcesz usuniąc to zgłoszenie? Operacja jest nieodrwacalna!!!
							<div className='update-status-wrapper'>
								<RequestStatus size='small' requestState={deleteRequestInProgress} />
							</div>
						</ConfirmModal.Content>
					</ConfirmModal>
				)}
			</div>
		)
	}
}

export default YourNotification
