import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'

import './MapMarker.scss'

import icons from '../../../assets/styleModules/icons.module.scss'

const MapMarker = ({ position, data, popupEnabled }) => {
	const cutOverflowDescription = value => {
		if (value.length > 145) {
			return value.slice(0, 145) + '...'
		}

		return value
	}

	const createIcon = type => {
		let iconType

		switch (type) {
			case 'niebezpieczne miejsca':
				iconType = 'dangerous'
				break
			case 'uszkodzenia':
				iconType = 'damage'
				break
			case 'zaniedbana zieleń':
				iconType = 'nature'
				break
			case 'zanieczyszczona przestrzeń':
				iconType = 'trashes'
				break
			default:
				iconType = ''
				break
		}

		return divIcon({ className: `${icons[iconType]} marker-icon`, ModalAnchor: [10, 0] })
	}

	return (
		<Marker key={`${data.type} ${data.number}`} position={position} icon={createIcon(data.type)}>
			{popupEnabled && (
				<Popup className='marker-info'>
					<h3 className='marker-info__header'>{data.type}</h3>
					<h4 className='marker-info__title'>{`Tytuł: ${data.title}`}</h4>
					<p className='marker-info__sub-header'>Treść:</p>
					<p className='marker-info__description'>{cutOverflowDescription(data.description)}</p>
					<Link className='marker-info__button' to={`/zgloszenie/${data.number}`}>
						Sprawdź szczegóły zgłoszenia
					</Link>
					<p className='marker-info__date'>{`Zgłoszono: ${new Date(
						data.date,
					).toLocaleString()}`}</p>
				</Popup>
			)}
		</Marker>
	)
}

MapMarker.defaultProps = {
	popupEnabled: true,
}

MapMarker.propTypes = {
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	popupEnabled: PropTypes.bool,
	data: PropTypes.object.isRequired,
}

export default MapMarker
