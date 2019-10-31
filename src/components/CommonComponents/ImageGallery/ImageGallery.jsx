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

		this.state = {
			selectedImage: '',
			selectedImageLoading: true,
		}

		props.imgSources.forEach((value, index) => {
			this.state[`image_${index}`] = true
		})
	}

	handleImageLoaded = e => {
		this.setState({ [e.target.dataset.image]: false })
	}

	handleImageClick = e => {
		this.setState({ selectedImage: [e.target.src] })
	}

	handleCloseModal = () => {
		this.setState({ selectedImage: '', selectedImageLoading: true })
	}

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
		const { imgSources, editable } = this.props
		const { selectedImage, selectedImageLoading } = this.state

		return (
			<div>
				<ul className='gallery'>
					{imgSources.length ? (
						imgSources.map((source, index) => (
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
	imgSources: [],
}

ImageGallery.propTypes = {
	imgSources: PropTypes.arrayOf(PropTypes.string),
}

export default ImageGallery
