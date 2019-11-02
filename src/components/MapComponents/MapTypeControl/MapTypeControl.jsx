/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DomEvent } from 'leaflet'

import './MapTypeControl.scss'
import styles from '../../../assets/styleModules/icons.module.scss'

class MapTypeControl extends Component {
	componentDidMount() {
		DomEvent.disableClickPropagation(this.wrapper)
	}

	render() {
		const { damage, nature, dangerous, trashes, onClick } = this.props

		return (
			<div
				ref={wrapper => (this.wrapper = wrapper)}
				className='leaflet-control leaflet-bar type-controls'
			>
				<a
					role='button'
					data-type='damage'
					onClick={onClick}
					className={`${styles.damage}${damage ? '' : ' leaflet-control--inactive'}`}
				/>
				<a
					role='button'
					data-type='nature'
					onClick={onClick}
					className={`${styles.nature}${nature ? '' : ' leaflet-control--inactive'}`}
				/>
				<a
					role='button'
					data-type='dangerous'
					onClick={onClick}
					className={`${styles.dangerous}${dangerous ? '' : ' leaflet-control--inactive'}`}
				/>
				<a
					role='button'
					data-type='trashes'
					onClick={onClick}
					className={`${styles.trashes}${trashes ? '' : ' leaflet-control--inactive'}`}
				/>
			</div>
		)
	}
}

MapTypeControl.defaultProps = {
	label: '',
	onClick: () => {},
}

MapTypeControl.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
}

export default MapTypeControl
