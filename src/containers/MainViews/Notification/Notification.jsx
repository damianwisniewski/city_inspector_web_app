import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Requester } from '../../../services/requester/requester'
import { MapMarker, MapLayout } from '../../../components/MapComponents'
import ImageGallery from '../../../components/CommonComponents/ImageGallery/ImageGallery'
import Button from '../../../components/CommonComponents/Button/Button'
import Tooltip from '../../../components/CommonComponents/Tooltip/Tooltip'
import NotificationDataRow from '../../../components/OtherComponents/NotificationDataRow/NotificationDataRow'

import './Notification.scss'
import RequestStatus from '../../../components/CommonComponents/RequestStatus/RequestStatus'
import CommentsWrapper from '../../../components/CommentsComponents/CommentsWrapper/CommentsWrapper'

const { REACT_APP_TITLE } = process.env

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
		}
	}

	componentDidMount() {
		Requester.send('getSingleNotifiacation', {
			params: {
				notificationId: this.state.id,
			},
		})
			.then(res => {
				this.setState({ data: res, fetchDataStatus: 'succeeded' })
				document.title = `Zgłoszenie - ${res.id}`
			})
			.catch(() => {
				this.setState({ fetchDataStatus: 'failed' })
			})

		Requester.send('getAllComments', {
			params: {
				notificationId: this.state.id,
			},
		})
			.then(res => {
				console.warn(res)
				this.setState({ comments: res, fetchCommentsStatus: 'succeeded' })
			})
			.catch(() => {
				this.setState({ fetchCommentsStatus: 'failed' })
			})
	}

	isNotifyBelongsToUser = () => {}

	render() {
		const {
			data: { user, id, category, status, date, title, localization = {}, description, photos },
			comments,
			fetchDataStatus,
			fetchCommentsStatus,
		} = this.state
		const { isUserAuth } = this.props

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
						<Button
							size='small'
							color='green'
							disabled={!isUserAuth || this.isNotifyBelongsToUser()}
						>
							Edycja
							<Tooltip hoverable>Musisz być zalogowany aby mieć dostęp do edycji</Tooltip>
						</Button>
					</section>
					<div className='notification__col-1'>
						<section className='notification__basic-info'>
							<NotificationDataRow linear label='Nr zgłoszenia:' content={id} />
							<NotificationDataRow linear label='Kategoria:' content={category} />
							<NotificationDataRow linear label='Status:' content={status} />
							<NotificationDataRow linear label='Data:' content={date} />
						</section>
						<section className='notification__more-info'>
							<NotificationDataRow vertical label='Tytuł:' content={title} />
							<NotificationDataRow
								vertical
								label='Adres:'
								content={`
								${localization.street}
								${localization.number},
								${localization.post}
								${localization.city}
							`}
							/>
							<NotificationDataRow vertical label='Opis:' content={description} />
						</section>
					</div>
					<div className='notification__col-2'>
						<section className='notification__map'>
							<MapLayout center={[localization.lat, localization.lon]} zoom={10}>
								<MapMarker
									key={id}
									popupEnabled={false}
									position={[localization.lat, localization.lon]}
									data={{
										type: category,
									}}
								/>
							</MapLayout>
						</section>

						<section className='notification__photos'>
							{photos && <ImageGallery imgSources={photos} />}
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
		isUserAuth: state.user.isUserAuth,
	}
}

export default connect(mapStateToProps)(Notification)
