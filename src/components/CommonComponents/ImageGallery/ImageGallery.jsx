import React, { Component } from 'react'
import PropTypes from 'prop-types'

// SCSS
import './ImageGallery.scss'
import { remove } from '../../../assets/styleModules/icons.module.scss'

// Components
import Modal from '../../ModalComponents/Modal/Modal'
import Loader from '../Loader/Loader'

class ImageGallery extends Component {
	constructor(props) {
		super(props)

		/**
		 * Creates properties with key of following pattern "image_[indexNumber]"
		 * It's necessary to proper image loading handle
		 */
		const images = props.imageFiles.reduce((accumulator, currentValue, currentIndex) => {
			accumulator[`image_${currentIndex}`] = true
			return accumulator
		}, {})

		this.state = {
			selectedImage: '',
			selectedImageLoading: true,
			...images,
		}
	}

	/**
	 * Sets states property image_index ("image_1") to false
	 * That means image is not loading
	 */
	handleImageLoaded = e => {
		this.setState({ [e.target.dataset.image]: false })
	}

	handleImageClick = e => {
		this.setState({ selectedImage: [e.target.src] })
	}

	handleCloseModal = () => {
		this.setState({ selectedImage: '', selectedImageLoading: true })
	}

	/**
	 * Handler for remove image click
	 */
	handleRemoveClick = e => {
		if (this.props.onRemoveImage) {
			const imageElement = e.target.nextSibling
			const imgName = imageElement.dataset.imageName
			const stateKey = imageElement.dataset.image

			this.setState({ [stateKey]: null })

			this.props.onRemoveImage({
				removed: imgName,
			})
		}
	}

	render() {
		const { imageFiles, editable } = this.props
		const { selectedImage, selectedImageLoading } = this.state

		return (
			<div>
				<ul className='gallery'>
					{imageFiles.length ? (
						imageFiles.map((source, index) => (
							<li className='gallery__item' key={`image-gallery-${index}`}>
								{editable && (
									<button
										type='button'
										className={`gallery__remove ${remove}`}
										onClick={this.handleRemoveClick}
									/>
								)}
								<img
									data-image={`image_${index}`}
									data-image-name={source.name}
									onLoad={this.handleImageLoaded}
									onClick={this.handleImageClick}
									className={`gallery__image ${
										this.state[`image_${index}`] ? 'gallery__image--hidden' : ''
									}`}
									src={source.imageData}
									alt={`gallery-${index}`}
								/>
								{this.state[`image_${index}`] && (
									<div className='loader-wrapper'>
										<Loader size='small' />
									</div>
								)}
							</li>
						))
					) : (
						<li className='gallery__placeholder'>Brak zdjęć...</li>
					)}
				</ul>
				{selectedImage && (
					<Modal
						darkOverlay
						closeButton
						onButtonClose={this.handleCloseModal}
						onOverlayClick={this.handleCloseModal}
					>
						<img
							data-image='selectedImageLoading'
							onLoad={this.handleImageLoaded}
							src={selectedImage}
							alt='gallery__image'
							className='gallery__large-image'
						/>
						{selectedImageLoading && (
							<div className='loader-wrapper'>
								<Loader size='medium' />
							</div>
						)}
					</Modal>
				)}
			</div>
		)
	}
}

ImageGallery.defaultProps = {
	imageFiles: [],
}

ImageGallery.propTypes = {
	imageFiles: PropTypes.arrayOf(PropTypes.string),
}

export default ImageGallery
