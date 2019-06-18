import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { requester } from '../../../services/requester/requester'
import MapLayout from '../../../components/MapComponents/MapLayout/MapLayout'
import ImageGallery from '../../../components/CommonComponents/ImageGallery/ImageGallery'
import Button from '../../../components/CommonComponents/Button/Button'
import Tooltip from '../../../components/CommonComponents/Tooltip/Tooltip'

import './Notification.scss'

const { REACT_APP_TITLE } = process.env

class Notification extends Component {
	static initialBounds = [[47.0273953314, 14.0745211117], [56.8515359564, 24.0299857927]]

	constructor(props) {
		super(props)
		const pathArr = this.props.location.pathname.split('/')

		this.state = {
			id: pathArr[pathArr.length - 1],
			data: null,

			center: [52.2297, 21.0122],
			bounds: Notification.initialBounds,

			damage: true,
			nature: true,
			dangerous: true,
			trashes: true,
		}
	}

	componentDidMount() {
		requester
			.get('notificationsAll', {
				id: this.state.id,
			})
			.then(res => this.setState({ data: res[0] }))

		document.title = `Zgłoszenie - ${this.state.id}`
	}

	isNotifyBelongsToUser = () => {}

	render() {
		const { data, bounds, center } = this.state
		const { isUserAuth } = this.props

		return (
			data && (
				<div className='notification'>
					<section className='notification__row'>
						<p>
							<span className='description-linear__header'>Użytkownik:</span>
							<span className='description-linear__data'>{data.user}</span>
						</p>
						<Button
							size='small'
							color='green'
							// disabled={!isUserAuth && this.isNotifyBelongsToUser()}
						>
							Edycja
							<Tooltip hoverable />
						</Button>
					</section>
					<div className='notification__col-1'>
						<section className='notification__description-linear description-linear'>
							<p>
								<span className='description-linear__header'>Nr zgłoszenia:</span>
								<span className='description-linear__data'>{data.id}</span>
							</p>
							<p>
								<span className='description-linear__header'>Kategoria:</span>
								<span className='description-linear__data'>{data.category}</span>
							</p>
							<p>
								<span className='description-linear__header'>Status:</span>
								<span className='description-linear__data'>{data.status}</span>
							</p>
							<p>
								<span className='description-linear__header'>Adres:</span>
								<span className='description-linear__data'>{data.address}</span>
							</p>
							<p>
								<span className='description-linear__header'>Data zgłoszenia:</span>
								<span className='description-linear__data'>{data.date}</span>
							</p>
						</section>
						<section className='notification__description-vertical description-vertical'>
							<div className='description-vertical__wrapper'>
								<p className='description-vertical__header'>Tytuł:</p>
								<p className='description-vertical__data'>{data.title}</p>
							</div>
							<div className='description-vertical__wrapper description-vertical__wrapper--large'>
								<p className='description-vertical__header'>Opis:</p>
								<p className='description-vertical__data'>{data.description}</p>
							</div>
						</section>
					</div>
					<div className='notification__col-2'>
						<section className='notification__map'>
							<MapLayout
								bounds={bounds}
								center={center}
								maxBounds={Notification.initialBounds}
								zoom={6}
							/>
						</section>

						<section className='notification__photos'>
							{data.photos && <ImageGallery imgSources={data.photos} />}
						</section>
					</div>
				</div>
			)
		)
	}
}

// Notification.propTypes = {}

function mapStateToProps(state) {
	return {
		isUserAuth: state.user.isUserAuth,
	}
}

export default connect(mapStateToProps)(Notification)
