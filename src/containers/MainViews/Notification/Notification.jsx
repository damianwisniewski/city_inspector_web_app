import React, { Component } from 'react'
import { connect } from 'react-redux'

// SCSS
import './Notification.scss'

// Components
import { MapMarker, MapLayout } from '../../../components/MapComponents'
import {
	ImageGallery,
	Button,
	RequestStatus,
	ConfirmModal,
	Loader,
} from '../../../components/CommonComponents'
import NotificationDataRow from '../../../components/OtherComponents/NotificationDataRow/NotificationDataRow'
import { CommentWrapper, CommentList, NewComment } from '../../../components/CommentsComponents'

// Others
import { Requester } from '../../../services/requester/requester'

// Actions
import { sagaRequestSubscriptions } from '../../../reduxStore/actionCreators/requestActions'
import { UploadButton } from '../../../components/FormComponents'

class Notification extends Component {
	static categories = [
		'niebezpieczne miejsca',
		'zaniedbana zieleń',
		'uszkodzenia',
		'zanieczyszczona przestrzeń',
	]

	static statuses = ['zgłoszone', 'zrealizowane', 'w realizacji']

	constructor(props) {
		super(props)
		const pathArr = this.props.location.pathname.split('/')

		this.state = {
			fetchDataStatus: 'pending',
			fetchCommentsStatus: 'pending',
			subscribeRequestStatus: 'initial',
			updateRequestStatus: 'initial',

			id: pathArr[pathArr.length - 1],
			data: {},
			comments: {},

			changes: {},
			newComment: '',

			isConfirmModalOpen: false,
			isNotifyBelongsToUser: false,
			isSubscribed: false,
			isEditEnabled: false,
		}
	}

	componentDidMount() {
		this.setState({
			isSubscribed: Boolean(
				this.props.subscriptions.find(item => item.notificationId === this.state.id),
			),
		})
		this.getNotificationData()
		this.getComments()
	}

	componentDidUpdate(prevProps, prevState) {
		const { subscriptions } = this.props
		const { id } = this.state

		if (!this.state.isNotifyBelongsToUser && prevProps.subscriptions !== this.props.subscriptions) {
			this.setState({
				isSubscribed: Boolean(subscriptions.find(item => item.NotificationId === id)),
			})
		}
	}

	onConfirmUpdate = () => {
		const { changes, id, data } = this.state
		const updatedData = { ...data, ...changes }

		const forms = new FormData()
		Object.entries(changes).forEach(([key, value]) => {
			if (value) {
				if (key === 'newPhotos') {
					value.forEach(photo => {
						forms.append('photos', photo.file)
					})
				} else if (key === 'deletePhotos') {
					forms.append('deletePhotos', changes.deletePhotos.map(photo => photo.imageData))
				} else {
					forms.append(key, String(value).toLowerCase())
				}
			}
		})

		this.setState({ updateRequestStatus: 'pending' }, () => {
			Requester.send('updateNotification', {
				params: { notificationId: id },
				body: forms,
			})
				.then(() =>
					this.setState({
						updateRequestStatus: 'succeeded',
						isConfirmModalOpen: false,
						isEditEnabled: false,
						data: updatedData,
					}),
				)
				.catch(() => this.setState({ updateRequestStatus: 'failed' }))
		})
	}

	onCloseConfirmModal = () =>
		this.setState({ isConfirmModalOpen: false, updateRequestStatus: 'initial' })

	onFieldChange = e => {
		const fieldName = e.target.dataset.name

		this.setState({
			changes: {
				...this.state.changes,
				[fieldName]: e.target.value,
			},
		})
	}

	onCommentChange = e => this.setState({ newComment: e.target.value })

	onSubmitComment = e => {
		const { id, sendCommentStatus, comments, newComment } = this.state
		e.preventDefault()

		if (sendCommentStatus !== 'pending' && newComment.trim()) {
			this.setState({ sendCommentStatus: 'pending' })

			Requester.send('createNewComment', {
				params: { notificationId: id },
				body: {
					text: newComment,
				},
			})
				.then(() =>
					this.setState({
						sendCommentStatus: 'succeeded',
						comments: [
							...comments,
							{ createdAt: Date.now(), nickname: this.props.nickname, text: newComment },
						],
						newComment: '',
					}),
				)
				.catch(() => this.setState({ sendCommentStatus: 'failed' }))
		}
	}

	onRemoveImage = eventData => {
		const { data, changes } = this.state
		const { photos, deletePhotos, newPhotos } = data.photos.reduce(
			(accumulator, currentValue) => {
				if (currentValue.name !== eventData.removed) {
					accumulator.photos.push(currentValue)

					if (
						changes.newPhotos &&
						changes.newPhotos.find(newPhoto => newPhoto.name === currentValue.name)
					) {
						accumulator.newPhotos.push(currentValue)
					}
				} else if (changes.newPhotos) {
					if (!changes.newPhotos.find(newPhoto => newPhoto.name === currentValue.name)) {
						accumulator.deletePhotos.push(currentValue)
					}
				} else {
					accumulator.deletePhotos.push(currentValue)
				}

				return accumulator
			},
			{
				photos: [],
				deletePhotos: [],
				newPhotos: [],
			},
		)

		this.setState({
			data: { ...this.state.data, photos },
			changes: {
				...this.state.changes,
				deletePhotos,
				newPhotos,
			},
		})
	}

	onUploadImage = async eventData => {
		const { data, changes } = this.state
		const newImages = await Promise.all(eventData.map(this.getImageDataFromFile))

		this.setState({
			data: {
				...data,
				photos: [...data.photos, ...newImages],
			},

			changes: {
				...changes,
				newPhotos: [...(changes.newPhotos ? changes.newPhotos : []), ...newImages],
			},
		})
	}

	getImageDataFromFile = imageData =>
		new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.addEventListener('load', event => {
				resolve({ imageData: event.target.result, name: imageData.name, file: imageData })
			})
			reader.addEventListener('error', () => {
				reject('Przepraszamy wystąpił błąd!')
			})
			reader.readAsDataURL(imageData)
		})

	getNotificationData = () => {
		Requester.send('getSingleNotifiacation', {
			params: {
				notificationId: this.state.id,
			},
		})
			.then(res => {
				res.photos = res.photos.map((photo, index) => {
					return {
						imageData: photo,
						name: photo.split('__')[1] || `image-${index}`,
					}
				})

				this.setState({
					data: res,
					fetchDataStatus: 'succeeded',
					isNotifyBelongsToUser: res.user === this.props.nickname,
				})
				document.title = `Zgłoszenie - ${res.id} | ${process.env.REACT_APP_TITLE}`
			})
			.catch(() => {
				this.setState({ fetchDataStatus: 'failed' })
			})
	}

	getComments = () => {
		Requester.send('getAllComments', {
			params: {
				notificationId: this.state.id,
			},
		})
			.then(res => {
				this.setState({ comments: res, fetchCommentsStatus: 'succeeded' })
			})
			.catch(() => {
				this.setState({ fetchCommentsStatus: 'failed' })
			})
	}

	toggleSubscribeNotification = async () => {
		const { isSubscribed, id, subscribeRequestStatus } = this.state
		const { subscriptions, refreshSubscriptions } = this.props

		if (subscribeRequestStatus === 'pending') return

		try {
			this.setState({
				subscribeRequestStatus: 'pending',
			})

			if (isSubscribed) {
				const subscriptionId = subscriptions.find(item => item.NotificationId === this.state.id).id

				await Requester.send('deleteSingleSubscription', {
					params: {
						subscriptionId,
					},
				})
			} else {
				await Requester.send('subscribeNotification', {
					params: {
						notificationId: id,
					},
				})
			}

			refreshSubscriptions()
		} finally {
			this.setState({
				subscribeRequestStatus: 'initial',
			})
		}
	}

	toggleModificationState = () => {
		const { data, changes, isEditEnabled } = this.state
		let previousPhotos = data.photos

		if (isEditEnabled && changes.newPhotos) {
			previousPhotos = data.photos
				.map(photo => changes.newPhotos.find(newPhotos => newPhotos !== photo))
				.filter(photo => photo)
		}

		this.setState({
			isEditEnabled: !isEditEnabled,

			data: {
				...data,
				photos: [...previousPhotos, ...(changes.deletePhotos ? changes.deletePhotos : [])],
			},
			changes: {},
		})
	}

	submitModifications = () => this.setState({ isConfirmModalOpen: true })

	renderActionButton = () => {
		const {
			isEditEnabled,
			isNotifyBelongsToUser,
			isSubscribed,
			subscribeRequestStatus,
		} = this.state
		const { isUserAuth } = this.props

		if (isNotifyBelongsToUser && isEditEnabled) {
			return (
				<div>
					<Button size='small' color='blue' onClick={this.toggleModificationState}>
						Anuluj
					</Button>
					<Button size='small' color='green' onClick={this.submitModifications}>
						Zatwierdź
					</Button>
				</div>
			)
		} else if (isNotifyBelongsToUser && !isEditEnabled) {
			return (
				<Button size='small' color='blue' onClick={this.toggleModificationState}>
					Edycja
				</Button>
			)
		} else if (!isNotifyBelongsToUser && isSubscribed) {
			return (
				<Button
					size='small'
					color='red'
					className='notification__subscribe--long'
					onClick={this.toggleSubscribeNotification}
				>
					{subscribeRequestStatus === 'pending' ? <Loader size='small' /> : 'Anuluj obserwowanie'}
				</Button>
			)
		} else if (isUserAuth && !isNotifyBelongsToUser && !isSubscribed) {
			return (
				<Button
					size='small'
					color='green'
					className='notification__subscribe--short'
					onClick={this.toggleSubscribeNotification}
				>
					{subscribeRequestStatus === 'pending' ? <Loader size='small' /> : 'Obserwuj'}
				</Button>
			)
		} else {
			return null
		}
	}

	render() {
		const {
			data: { user, id, category, status, date, title, localization = {}, description, photos },
			comments,
			fetchDataStatus,
			fetchCommentsStatus,
			isEditEnabled,
			isConfirmModalOpen,
			updateRequestStatus,
			sendCommentStatus,
			newComment,
		} = this.state

		const { isMobile } = this.props

		return (
			<RequestStatus
				requestState={fetchDataStatus}
				fullview
				color='blue'
				size='large'
				direction='vertical'
			>
				<div className='notification'>
					<section className='notification__row notification__container notification__header'>
						<NotificationDataRow linear label='Użytkownik:' value={user} />
						{this.renderActionButton()}
					</section>
					<section className='notification__row'>
						<div className='notification__col-1 notification__container'>
							{/** BASIC INFO */}
							<section className='notification__basic-info'>
								<NotificationDataRow linear label='Nr zgłoszenia:' value={id} />
								<NotificationDataRow
									linear
									data-name='category'
									label='Kategoria:'
									editable={isEditEnabled}
									fieldType='select'
									options={Notification.categories}
									onChange={this.onFieldChange}
									value={category}
								/>
								<NotificationDataRow
									linear
									data-name='status'
									label='Status:'
									editable={isEditEnabled}
									fieldType='select'
									options={Notification.statuses}
									onChange={this.onFieldChange}
									value={status}
								/>

								<NotificationDataRow linear label='Data:' value={new Date(date).toLocaleString()} />
							</section>

							{/** MORE INFO */}
							<section className='notification__more-info'>
								<NotificationDataRow
									vertical
									data-name='title'
									label='Tytuł:'
									editable={isEditEnabled}
									fieldType='textarea'
									rows='2'
									onChange={this.onFieldChange}
									noresize
									value={title}
								/>
								<NotificationDataRow
									vertical
									label='Adres:'
									value={`
									${localization.street || ''}
									${localization.number ? localization.number + ', ' : ''}
									${localization.post || ''}
									${localization.city || ''}
								`}
								/>
								<NotificationDataRow
									vertical
									label='Opis:'
									data-name='description'
									editable={isEditEnabled}
									fieldType='textarea'
									rows='6'
									onChange={this.onFieldChange}
									noresize
									value={description}
								/>
							</section>
						</div>

						{/** Right col - map and image gallery */}
						<div className='notification__col-1'>
							<section className='notification__map'>
								<MapLayout center={[localization.lat, localization.lng]} zoom={10}>
									<MapMarker
										key={id}
										popupEnabled={false}
										position={[localization.lat, localization.lng]}
										data={{
											type: category,
										}}
									/>
								</MapLayout>
							</section>
						</div>
					</section>
					<div className='notification__row'>
						{isEditEnabled ? (
							<>
								<section className='notification__col-1 notification__photos'>
									<UploadButton
										id='new-notification-upload-button'
										acceptsFile='image/png'
										onAddImages={this.onUploadImage}
										mobile={isMobile.toString()}
									/>
								</section>
								<section className='notification__col-2 notification__photos'>
									<ImageGallery imageFiles={photos} editable onRemoveImage={this.onRemoveImage} />
								</section>
							</>
						) : (
							<section className='notification__col-1 notification__photos'>
								<ImageGallery imageFiles={photos} onRemoveImage={this.onRemoveImage} />
							</section>
						)}
					</div>

					{/** Comments */}
					<section className='notification__row notification__container'>
						<RequestStatus requestState={fetchCommentsStatus} size='medium' direction='vertical'>
							<CommentWrapper>
								<CommentList comments={comments} />
								{sendCommentStatus === 'pending' ? (
									<Loader />
								) : (
									<NewComment
										value={newComment}
										onCommentChange={this.onCommentChange}
										onSubmitComment={this.onSubmitComment}
									/>
								)}
							</CommentWrapper>
						</RequestStatus>
					</section>

					{/** Confirm Modal */}
					{isConfirmModalOpen && (
						<ConfirmModal onCancel={this.onCloseConfirmModal} onConfirm={this.onConfirmUpdate}>
							<ConfirmModal.Header>Uwaga!</ConfirmModal.Header>
							<ConfirmModal.Content>
								Czy jesteś pewien ze chcesz zapisać zmiany w ogłoszeniu?
								<div className='update-status-wrapper'>
									<RequestStatus size='small' requestState={updateRequestStatus} />
								</div>
							</ConfirmModal.Content>
						</ConfirmModal>
					)}
				</div>
			</RequestStatus>
		)
	}
}

function mapStateToProps(state) {
	return {
		isUserAuth: state.user.isUserAuth,
		nickname: state.user.data.nickname,
		subscriptions: state.user.collectionOfSubscriptions,
		isMobile: state.env.isMobile,
	}
}

const mapDispatchToProps = {
	refreshSubscriptions: sagaRequestSubscriptions,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Notification)
