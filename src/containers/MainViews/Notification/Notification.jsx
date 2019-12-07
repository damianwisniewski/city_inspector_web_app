import React, { Component } from 'react'
import { connect } from 'react-redux'

// SCSS
import './Notification.scss'

// Components
import { MapMarker, MapLayout } from '../../../components/MapComponents'
import { ImageGallery, Button, Tooltip, RequestStatus } from '../../../components/CommonComponents'
import NotificationDataRow from '../../../components/OtherComponents/NotificationDataRow/NotificationDataRow'
import CommentsWrapper from '../../../components/CommentsComponents/CommentsWrapper/CommentsWrapper'

// Others
import { Requester } from '../../../services/requester/requester'

class Notification extends Component {
	constructor(props) {
		super(props)
		const pathArr = this.props.location.pathname.split('/')

		this.state = {
			fetchDataStatus: 'pending',
			fetchCommentsStatus: 'pending',
			id: pathArr[pathArr.length - 1],
			data: {},
			comments: {},
			isNotifyBelongsToUser: false,
			isEditEnabled: false,
			modificationInProgress: false,
		}
	}

	/**
	 * Fetches all data of notification
	 */
	getNotificationData = () => {
		Requester.send('getSingleNotifiacation', {
			params: {
				notificationId: this.state.id,
			},
		})
			.then(res => {
				const notifyData = res
				console.log(res)
				notifyData.photos = notifyData.photos.map((photo, index) => {
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

	/**
	 * Fetches comments
	 */
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

	componentDidMount() {
		this.getNotificationData()
		this.getComments()
	}

	renderActionButton = () => {
		const { isNotifyBelongsToUser } = this.props
		const { modificationInProgress } = this.state
		const isSubscribed = false

		if (isNotifyBelongsToUser && modificationInProgress) {
			return (
				<div>
					<Button size='small' color='blue'>
						Anuluj
					</Button>
					<Button size='small' color='blue'>
						Zatwierdź
					</Button>
				</div>
			)
		} else if (isNotifyBelongsToUser && !modificationInProgress) {
			return (
				<Button size='small' color='blue'>
					Edycja
				</Button>
			)
		} else if (!isNotifyBelongsToUser && isSubscribed) {
			return (
				<Button size='small' color='red'>
					Anuluj obserwowanie
				</Button>
			)
		} else if (!isNotifyBelongsToUser && !isSubscribed) {
			return (
				<Button size='small' color='green'>
					Obserwuj
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
		} = this.state

		return (
			<RequestStatus
				requestState={fetchDataStatus}
				fullview
				color='blue'
				size='large'
				direction='vertical'
			>
				<div className='notification'>
					<section className='notification__row'>
						<NotificationDataRow linear label='Użytkownik:' content={user} />
						{this.renderActionButton()}
					</section>
					<div className='notification__col-1'>
						{/** BASIC INFO */}
						<section className='notification__basic-info'>
							<NotificationDataRow linear label='Nr zgłoszenia:' content={id} />
							<NotificationDataRow
								linear
								label='Kategoria:'
								content={category}
								editable={isEditEnabled}
							/>
							<NotificationDataRow
								linear
								label='Status:'
								content={status}
								editable={isEditEnabled}
							/>
							<NotificationDataRow linear label='Data:' content={date} />
						</section>

						{/** MORE INFO */}
						<section className='notification__more-info'>
							<NotificationDataRow
								vertical
								label='Tytuł:'
								content={title}
								editable={isEditEnabled}
							/>
							<NotificationDataRow
								vertical
								label='Adres:'
								content={`
								${localization.street || ''}
								${localization.number ? localization.number + ', ' : ''}
								${localization.post || ''}
								${localization.city || ''}
							`}
							/>
							<NotificationDataRow
								vertical
								label='Opis:'
								content={description}
								editable={isEditEnabled}
							/>
						</section>
					</div>
					<div className='notification__col-2'>
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

						<section className='notification__photos'>
							{photos && <ImageGallery imageFiles={photos} />}
						</section>
					</div>
					<section className='notification__row'>
						<RequestStatus requestState={fetchCommentsStatus} size='medium' direction='vertical'>
							<CommentsWrapper comments={comments} />
						</RequestStatus>
					</section>
				</div>
			</RequestStatus>
		)
	}
}

function mapStateToProps(state) {
	return {
		nickname: state.user.data.nickname,
	}
}

export default connect(mapStateToProps)(Notification)
