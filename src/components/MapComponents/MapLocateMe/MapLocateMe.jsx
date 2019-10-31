import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './MapLocateMe.scss'
import { locate, loader } from '../../../assets/styleModules/icons.module.scss'

class MapLocateMe extends Component {
	state = {
		isGeolocationSupported: 'geolocation' in navigator,
		localizationInProgress: false,
	}

	getCurrentPosition = () => {
		if (this.state.isGeolocationSupported) {
			this.setState({ localizationInProgress: true })
			navigator.geolocation.getCurrentPosition(
				this.handleLocalizationSuccess,
				this.handleLocalizationError,
			)
		}
	}

	handleLocalizationSuccess = positionObj => {
		const { onLocalize } = this.props
		const cords = [positionObj.latitude, positionObj.longitude]
		this.setState({ localizationInProgress: false })
		onLocalize && onLocalize(cords)
	}

	handleLocalizationError = () => this.setState({ localizationInProgress: false })

	render() {
		const { localizationInProgress } = this.state

		return (
			<div className='leaflet-control leaflet-bar locate-control'>
				<a
					role='button'
					data-type='locate'
					onLocalize={this.getCurrentPosition}
					className={localizationInProgress ? `${loader}` : locate}
				/>
			</div>
		)
	}
}

MapLocateMe.propTypes = {
	onLocalize: PropTypes.func.isRequired,
}

export default MapLocateMe
