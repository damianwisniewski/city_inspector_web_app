import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer } from 'react-leaflet'

import './MapLayout.scss'

const MapLayout = ({ children, bounds, center, maxBounds, zoom }) => (
	<Map
		className='map-layout'
		center={center}
		bounds={bounds}
		keyboard
		zoom={zoom}
		maxBounds={maxBounds}
		minZoom={6}
		maxZoom={18}
		zoomControl={false}
		useFlyTo
	>
		<TileLayer
			attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
			url='https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=wa2ERdrAv6aWnd9IrOen'
		/>
		{children}
	</Map>
)

MapLayout.defaultProps = {
	onTypeControlClick: () => {},
	onSearchCity: () => {},
	children: null,
	zoomControl: false,
	mapSearch: false,
	mapTypeControl: false,
}

MapLayout.propTypes = {
	onTypeControlClick: PropTypes.func,
	onSearchCity: PropTypes.func,
	children: PropTypes.node,
	zoomControl: PropTypes.bool,
	mapSearch: PropTypes.bool,
	mapTypeControl: PropTypes.bool,
}

export default MapLayout
