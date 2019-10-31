import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ZoomControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import './MapView.scss'

import RequestStatus from '../../../components/CommonComponents/RequestStatus/RequestStatus'
import { MapLayout, MapMarker, MapSearch, MapTypeControl } from '../../../components/MapComponents/'
import { checkPropertiesEquality, translateParams } from '../../../helpers'

import { sagaRequestNotifications } from '../../../reduxStore/actionCreators/requestActions'
import { clearNotifications } from '../../../reduxStore/actionCreators/notificationsActions'
import MapLocateMe from '../../../components/MapComponents/MapLocateMe/MapLocateMe'

// const { REACT_APP_TITLE } = process.env

class MapView extends Component {
	static initialBounds = [[47.0273953314, 14.0745211117], [56.8515359564, 24.0299857927]]

	state = {
		center: [52.2297, 21.0122],
		bounds: MapView.initialBounds,

		damage: true,
		nature: true,
		dangerous: true,
		trashes: true,
	}

	handleSearchLoc = selectedLoc => {
		const selectedLocCenter = [selectedLoc.lat, selectedLoc.lon]
		const selectedLocBounding = [
			[selectedLoc.boundingbox[1], selectedLoc.boundingbox[0]],
			[selectedLoc.boundingbox[3], selectedLoc.boundingbox[2]],
		]
		this.setState(
			{ center: selectedLocCenter, bounds: selectedLocBounding },
			this.props.onSearchCity,
		)
	}

	handleTypeControlClick = e => {
		const isButtonEnabled = this.state[e.target.dataset.type]
		this.setState({ [e.target.dataset.type]: !isButtonEnabled })
	}

	requestForNotifications = () => {
		const { damage, dangerous, nature, trashes } = this.state
		const objParams = { damage, dangerous, nature, trashes }

		const translatedParams = Object.keys(objParams).reduce((accumulator, currentKey) => {
			if (objParams[currentKey]) {
				accumulator.push(translateParams(currentKey))
			}
			return accumulator
		}, [])

		if (translatedParams.length) {
			this.props.sagaRequestNotifications({
				category: translatedParams,
			})
		} else {
			this.props.clearNotifications()
		}
	}

	componentDidMount() {
		this.requestForNotifications()
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			!checkPropertiesEquality(
				[this.state, prevState],
				['damage', 'nature', 'dangerous', 'trashes'],
			)
		) {
			this.requestForNotifications()
		}
	}

	render() {
		const { center, bounds, ...typeControlsStatuses } = this.state
		const { notificationList, getNotificationsRequestStatus } = this.props

		return (
			<div className='map-view'>
				<MapLayout bounds={bounds} center={center} maxBounds={MapView.initialBounds} zoom={6}>
					<MarkerClusterGroup>
						{notificationList &&
							Boolean(notificationList.length) &&
							notificationList.map(notification => (
								<MapMarker
									key={notification.id}
									position={[notification.lat, notification.lon]}
									data={{
										type: notification.category,
										number: notification.id,
										title: notification.title,
										description: notification.description,
										date: notification.createdAt,
									}}
								/>
							))}
					</MarkerClusterGroup>
					<div className='map-view__loader-wrapper'>
						<RequestStatus
							className='map-view__loader-wrapper'
							requestState={getNotificationsRequestStatus}
							errorMessage='Przepraszamy coś poszło nie tak!'
							direction='vertical'
							size='medium'
						/>
					</div>
					<ZoomControl position='topright' />
					<MapLocateMe onClick={() => {}} />
					<MapSearch onSelect={this.handleSearchLoc} placeholder='Wyszukaj miasto...' />
					<MapTypeControl onClick={this.handleTypeControlClick} {...typeControlsStatuses} />
				</MapLayout>
			</div>
		)
	}
}

MapView.defaultProps = {
	notificationList: [],
}

function mapStateToProps(state) {
	return {
		notificationList: state.notifications.notifications,
		getNotificationsRequestStatus: state.requests.getNotificationsRequestStatus,
	}
}

export default connect(
	mapStateToProps,
	{ sagaRequestNotifications, clearNotifications },
)(MapView)
