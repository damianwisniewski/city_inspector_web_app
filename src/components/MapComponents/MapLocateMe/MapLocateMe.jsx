/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withLeaflet } from 'react-leaflet'

// SCSS
import './MapLocateMe.scss'
import { locate, loader } from '../../../assets/styleModules/icons.module.scss'

class MapLocateMe extends Component {
	state = {
		isGeolocationSupported: 'geolocation' in navigator,
		localizationInProgress: false,
	}

	/**
	 * Happens onClick locate me icon
	 * Requests for localize user
	 */
	getCurrentPosition = () => {
		if (this.state.isGeolocationSupported) {
			this.setState({ localizationInProgress: true })
			navigator.geolocation.getCurrentPosition(
				this.handleLocalizationSuccess,
				this.handleLocalizationError,
				{
					enableHighAccuracy: true,
				},
			)
		}
	}

	/**
	 * Handler for successful localize
	 * - Passes localize coords to listener callback [onLocalize]
	 * - Changes map position, centred to received coords
	 * @param {Position} positionObj
	 */
	handleLocalizationSuccess = positionObj => {
		const { onLocalize } = this.props
		const coords = [positionObj.coords.latitude, positionObj.coords.longitude]

		this.setState({ localizationInProgress: false })
		this.props.leaflet.map.flyTo(coords, 12)

		if (onLocalize) {
			onLocalize(coords)
		}
	}

	/**
	 * Handler for error localize
	 */
	handleLocalizationError = () => this.setState({ localizationInProgress: false })

	render() {
		const { localizationInProgress } = this.state

		return (
			<div className='leaflet-control leaflet-bar locate-control'>
				<a
					role='button'
					data-type='locate'
					onClick={this.getCurrentPosition}
					className={localizationInProgress ? `${loader}` : locate}
				/>
			</div>
		)
	}
}

MapLocateMe.propTypes = {
	onLocalize: PropTypes.func.isRequired,
}

export default withLeaflet(MapLocateMe)
