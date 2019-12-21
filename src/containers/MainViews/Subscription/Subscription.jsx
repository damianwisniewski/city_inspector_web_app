import React, { Component } from 'react'

// SCSS
import './Subscription.scss'
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

class Subscription extends Component {
	static categories = {
		'Numer zgloszenia': 'NotificationId',
	}

	state = {
		subscription: [],
		selectedValues: [],
		subscriptionToDelete: null,
		getSubscriptionRequestStatus: 'initial',
		deleteRequestInProgress: 'initial',
		isDeleteConfirmModalOpen: false,
		// change resreshTimestamp to fetch subscriptions again
		refreshTimestamp: Date.now(),
	}

	componentDidMount() {
		document.title = `Subskrypcje | ${process.env.REACT_APP_TITLE}`

		/**
		 * Get all notification that own
		 */
		this.setState(
			{
				getSubscriptionRequestStatus: 'pending',
			},
			() => {
				Requester.send('getAllSubscriptions')
					.then(res =>
						this.setState({
							subscription: res,
							getSubscriptionRequestStatus: 'succeeded',
						}),
					)
					.catch(() =>
						this.setState({
							getSubscriptionRequestStatus: 'error',
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
				const category = Subscription.categories[element.searchCategory]
				requestQueries[category] = element.searchContent
			})

			/**
			 * Get all notification that own
			 */
			this.setState(
				{
					getSubscriptionRequestStatus: 'pending',
				},
				() => {
					Requester.send('getAllSubscriptions', {
						queries: requestQueries,
					})
						.then(res =>
							this.setState({
								subscription: res,
								getSubscriptionRequestStatus: 'succeeded',
							}),
						)
						.catch(() => {
							this.setState({
								getSubscriptionRequestStatus: 'error',
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
		const idField = Array.from(rowElement.children).find(
			child => child.dataset.name === 'Numer zgloszenia',
		)
		const id = idField && idField.dataset.id

		if (id) {
			this.setState({ isDeleteConfirmModalOpen: true, subscriptionToDelete: id })
		}
	}

	/**
	 * Removes notification
	 */
	handleRemoveConfirmClick = () => {
		this.setState({ deleteRequestInProgress: 'pending' })

		Requester.send('deleteSingleSubscription', {
			params: {
				subscriptionId: this.state.subscriptionToDelete,
			},
		})
			.then(() => {
				this.setState({
					isDeleteConfirmModalOpen: false,
					subscriptionToDelete: null,
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
			subscriptionToDelete: null,
			deleteRequestInProgress: 'initial',
		})
	}

	/**
	 * Redirects to page with full information of notification
	 */
	handleToNotifyClick = e => {
		const rowElement = e.currentTarget.parentNode.parentNode
		const idField = Array.from(rowElement.children).find(
			child => child.dataset.name === 'Numer zgloszenia',
		)
		const id = idField && idField.textContent

		this.props.history.push(`/zgloszenie/${id}`)
	}

	render() {
		const {
			subscription,
			isDeleteConfirmModalOpen,
			deleteRequestInProgress,
			getSubscriptionRequestStatus,
		} = this.state

		return (
			<div id='Subscription' className='subscription'>
				<SearchField
					categories={Object.keys(Subscription.categories)}
					onSearchChange={this.handleSubmitSearchValue}
				/>
				<Table noWrap scrollable>
					<Table.Header>
						<Table.Row>
							{[...Object.keys(Subscription.categories), 'Akcje'].map((header, index) => (
								<Table.Cell key={`header_${index}`} section='header'>
									{header}
								</Table.Cell>
							))}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{getSubscriptionRequestStatus === 'pending' && (
							<Table.Row>
								<Table.Cell
									className='no-after-label'
									colSpan={Object.keys(Subscription.categories).length + 1}
								>
									<Loader />
								</Table.Cell>
							</Table.Row>
						)}
						{getSubscriptionRequestStatus !== 'pending' &&
							(subscription.length ? (
								subscription.map((row, rowIndex) => (
									<Table.Row key={`row_${rowIndex}`}>
										<Table.Cell name={Object.keys(Subscription.categories)[0]} data-id={row.id}>
											{row.NotificationId}
										</Table.Cell>
										<Table.Cell className='subscription__actions'>
											<span onClick={this.handleRemoveClick} className={styles.remove} />
											<span onClick={this.handleToNotifyClick} className={styles['go-to']} />
										</Table.Cell>
									</Table.Row>
								))
							) : (
								<Table.Row>
									<Table.Cell
										className='no-after-label'
										colSpan={Object.keys(Subscription.categories).length + 1}
									>
										Brak Subsckrypcji...
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
							Czy jesteś pewien ze chcesz usuniąc tą subskrypcje? Operacja jest nieodrwacalna!!!
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

export default Subscription
