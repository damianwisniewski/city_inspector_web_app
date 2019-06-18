import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ImageGallery.scss'
import Popup from '../../PopupComponents/Popup/Popup'
import RequestStatus from '../RequestStatus/RequestStatus'
import Loader from '../Loader/Loader'

class ImageGallery extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedImage: '',
			selectedImageLoading: true,
		}

		props.imgSources.forEach((value, index) => {
			this.state[`image_${index}`] = true
		})
	}

	handleImageLoaded = e => {
		console.log(e.target.dataset)
		this.setState({ [e.target.dataset.image]: false })
	}

	handleImageClick = e => {
		this.setState({ selectedImage: [e.target.src] })
	}

	handleClosePopup = () => {
		this.setState({ selectedImage: '', selectedImageLoading: true })
	}

	render() {
		const { imgSources } = this.props
		const { selectedImage, selectedImageLoading } = this.state

		return (
			<div>
				<ul className='gallery'>
					{imgSources.map((source, index) => (
						<li className='gallery__item' key={`image-gallery-${index}`}>
							<img
								data-image={`image_${index}`}
								onLoad={this.handleImageLoaded}
								onClick={this.handleImageClick}
								className={`gallery__image ${
									this.state[`image_${index}`] ? 'gallery__image--hidden' : ''
								}`}
								src={source}
								alt={`gallery-${index}`}
							/>
							{this.state[`image_${index}`] && (
								<div className='loader-wrapper'>
									<Loader size='small' />
								</div>
							)}
						</li>
					))}
				</ul>
				{selectedImage && (
					<Popup
						darkOverlay
						closeButton
						onButtonClose={this.handleClosePopup}
						onOverlayClick={this.handleClosePopup}
					>
						<img
							data-image='selectedImageLoading'
							onLoad={this.handleImageLoaded}
							src={selectedImage}
							alt='gallery__image'
						/>
						{selectedImageLoading && (
							<div className='loader-wrapper'>
								<Loader size='medium' />
							</div>
						)}
					</Popup>
				)}
			</div>
		)
	}
}

ImageGallery.propTypes = {}

export default ImageGallery
