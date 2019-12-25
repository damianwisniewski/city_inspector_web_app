import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ZoomControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

// SCSS
import './MapView.scss'

// Components
import { RequestStatus } from '../../../components/CommonComponents'
import {
	MapLayout,
	MapMarker,
	MapSearch,
	MapTypeControl,
	MapLocateMe,
} from '../../../components/MapComponents/'

// Actions
import { sagaRequestNotifications } from '../../../reduxStore/actionCreators/requestActions'
import { clearNotifications } from '../../../reduxStore/actionCreators/notificationsActions'

// Others
import { checkPropertiesEquality, translateParams } from '../../../helpers'

class MapView extends Component {
	static initialBounds = [[47.0273953314, 14.0745211117], [56.8515359564, 24.0299857927]]

	state = {
		// Basic settings for map
		center: [52.2297, 21.0122],
		bounds: MapView.initialBounds,
		zoom: 6,

		/**
		 * Null means that indicator of your location doesn't exist
		 * In other case there will be stored array with coords to your location
		 */
		myLocation: null,

		/**
		 * Flags to enable/disable some types of notifications on map
		 */
		damage: true,
		nature: true,
		dangerous: true,
		trashes: true,
	}

	/**
	 * Handler for select searched city.
	 * Changes basic settings of map to those of selected city.
	 */
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

	/**
	 * Sets locations
	 */
	handleTypeControlClick = e => {
		const controlType = e.target.dataset.type
		const isButtonEnabled = this.state[controlType]

		this.setState({ [controlType]: !isButtonEnabled })
	}

	/**
	 * Handler for geolocation localize
	 * Sets coords to state to create marker with your location
	 */
	handleLocalize = locCoords => {
		this.setState({ myLocation: locCoords })
	}

	/**
	 * Requests for notifications with array of enabled notification types
	 */
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
		document.title = `Mapa | ${process.env.REACT_APP_TITLE}`
		this.requestForNotifications()
	}

	componentDidUpdate(prevProps, prevState) {
		/**
		 * Compares equality of MapTypeControl flags in state.
		 * Requests for new list of notifications if any of them change.
		 */
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
		const { center, bounds, zoom, myLocation, ...typeControlsStatuses } = this.state
		const { notificationList, getNotificationsRequestStatus } = this.props

		return (
			<div id='map-view' className='map-view'>
				<MapLayout bounds={bounds} center={center} maxBounds={MapView.initialBounds} zoom={zoom}>
					<MarkerClusterGroup>
						{notificationList &&
							Boolean(notificationList.length) &&
							notificationList.map(notification => (
								<MapMarker
									key={notification.id}
									position={[notification.lat, notification.lng]}
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
					{myLocation && (
						<MapMarker
							popupEnabled={false}
							position={myLocation}
							data={{
								type: 'default',
							}}
						/>
					)}
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
					<MapLocateMe onLocalize={this.handleLocalize} />
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
