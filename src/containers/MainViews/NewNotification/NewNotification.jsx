import React, { Component } from 'react'

// SCSS
import './NewNotification.scss'
import icons from '../../../assets/styleModules/icons.module.scss'

// Components
import { Form, Select, Input, Textarea, UploadButton } from '../../../components/FormComponents'
import { MapLayout, MapMarker, MapLocateMe } from '../../../components/MapComponents'
import { ImageGallery, Button } from '../../../components/CommonComponents'

// Others
import { Requester } from '../../../services/requester/requester'

class NewNotification extends Component {
	state = {
		category: 'Niebezpieczne Miejsca',
		status: 'zgłoszone',
		title: '',
		description: '',
		city: '',
		street: '',
		number: '',
		post: '',
		lat: 52.2297,
		lng: 21.0122,
		photos: [],
	}

	componentDidMount() {
		document.title = `Nowe zgłoszenie | ${process.env.REACT_APP_TITLE}`
	}

	getImageDataFromFile = imageData =>
		new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.addEventListener('load', event => {
				resolve({ imageData: event.target.result, name: imageData.name, file: imageData })
			})
			reader.addEventListener('error', () => {
				reject('Przepraszamy wystąpił błąd!')
			})
			reader.readAsDataURL(imageData)
		})

	/**
	 * Handler for mover marker on Map
	 */
	handlePointerMove = e => {
		const { lat, lng } = e.target.getLatLng()
		this.setState({ lat, lng })
	}

	/**
	 * Handler for upload image
	 */
	handleUploadImage = async (eventData = []) => {
		const newImages = await Promise.all(eventData.map(this.getImageDataFromFile))
		this.setState({ photos: [...this.state.photos, ...newImages] })
	}

	/**
	 * Handler for input value changes
	 */
	handleFormFieldChanges = e => {
		const key = e.target.dataset.stateName
		const value = e.target.value

		this.setState({ [key]: value })
	}

	/**
	 * Hander for remove image from gallery of uploaded images
	 */
	handleRemoveImage = eventData => {
		const filteredPhotos = this.state.photos.filter(photo => photo.name !== eventData.removed)
		this.setState({ photos: filteredPhotos })
	}

	/**
	 * Handler for localize of your location
	 */
	handleLocalize = locCoords => {
		if (locCoords) {
			this.setState({ lat: locCoords[0], lng: locCoords[1] })
		}
	}

	/**
	 * @param {Event} e
	 */
	handleCreateNotification = e => {
		e.preventDefault()

		const { ...formData } = this.state

		const forms = new FormData()
		Object.entries(formData).forEach(([key, value]) => {
			if (value) {
				if (key === 'photos') {
					value.forEach(photo => {
						forms.append(key, photo.file)
					})
				} else {
					forms.append(key, String(value).toLowerCase())
				}
			}
		})

		Requester.send('createNotification', { body: forms })
			.then(res => console.log(res))
			.catch(err => console.error(err))
	}

	render() {
		const { category, title, description, city, post, street, number, lat, lng } = this.state

		return (
			<div id='NewNotification' className='new-notification'>
				<Form>
					<section className='section category-section'>
						<h2 className='section__header'>Kategoria</h2>
						<p className='section__description'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat molestiae suscipit
							possimus beatae itaque, repellat sunt debitis blanditiis quo temporibus magni esse
							molestias in? Consequuntur corrupti magni dolore error incidunt.
						</p>
						<Select
							id='new-notification-category-select'
							data-state-name='category'
							value={category}
							onChange={this.handleFormFieldChanges}
						>
							<Select.option>Niebezpieczne Miejsca</Select.option>
							<Select.option>Zaniedbana Zieleń</Select.option>
							<Select.option>Uszkodzenia</Select.option>
							<Select.option>Zanieczyszczona Przestrzeń</Select.option>
						</Select>

						<div className='section__legend legend'>
							<p className={`legend__option ${icons.dangerous}`}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et unde dolorum
								ad itaque ipsam odit voluptatem similique ratione sapiente?
							</p>
							<p className={`legend__option ${icons.nature}`}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et unde dolorum
								ad itaque ipsam odit voluptatem similique ratione sapiente?
							</p>
							<p className={`legend__option ${icons.damage}`}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et unde dolorum
								ad itaque ipsam odit voluptatem similique ratione sapiente?
							</p>
							<p className={`legend__option ${icons.trashes}`}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et unde dolorum
								ad itaque ipsam odit voluptatem similique ratione sapiente?
							</p>
						</div>
					</section>
					<section className='section description-section'>
						<h2 className='section__header'>Opis</h2>
						<p className='section__description'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat molestiae suscipit
							possimus beatae itaque, repellat sunt debitis blanditiis quo temporibus magni esse
							molestias in? Consequuntur corrupti magni dolore error incidunt.
						</p>
						<Input
							id='new-notification-title'
							data-state-name='title'
							value={title}
							onChange={this.handleFormFieldChanges}
							label='Tytuł:'
							placeholder='Wpisz tytuł dla zgłoszenia'
						/>
						<Textarea
							id='new-notification-description'
							data-state-name='description'
							value={description}
							onChange={this.handleFormFieldChanges}
							label='Opis miejsa:'
							placeholder='Wpisz opis dotyczący zgłaszanego miejsca'
							className='section__desctiption-field'
						/>
					</section>
					<section className='section localization-section'>
						<h2 className='section__header'>Lokalizacja</h2>
						<p className='section__description'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat molestiae suscipit
							possimus beatae itaque, repellat sunt debitis blanditiis quo temporibus magni esse
							molestias in? Consequuntur corrupti magni dolore error incidunt.
						</p>
						<div className='section__row'>
							<Input
								id='new-notification-street'
								data-state-name='street'
								value={street}
								onChange={this.handleFormFieldChanges}
								label='Ulica:'
								placeholder='Wpisz nazwę ulicy...'
							/>
							<Input
								id='new-notification-number'
								data-state-name='number'
								value={number}
								onChange={this.handleFormFieldChanges}
								label='Numer'
								placeholder='Podaj number domu / mieszkania...'
							/>
						</div>
						<div className='section__row'>
							<Input
								id='new-notification-city'
								data-state-name='city'
								value={city}
								onChange={this.handleFormFieldChanges}
								label='Miasto:'
								placeholder='Wpisz nazwę miasta...'
							/>
							<Input
								id='new-notification-post'
								data-state-name='post'
								value={post}
								onChange={this.handleFormFieldChanges}
								label='Kod pocztowy:'
								placeholder='Wpisz kod pocztowy...'
							/>
						</div>
						<section className='section__map'>
							<MapLayout center={[lat, lng]} zoom={10}>
								<MapMarker
									popupEnabled={false}
									onDragEnd={this.handlePointerMove}
									position={[lat, lng]}
									data={{
										type: category,
									}}
									draggable
								/>
								<MapLocateMe onLocalize={this.handleLocalize} />
							</MapLayout>
						</section>
					</section>
					<section className='section photos-section'>
						<h2 className='section__header'>Zdjęcia</h2>
						<p className='section__description'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat molestiae suscipit
							possimus beatae itaque, repellat sunt debitis blanditiis quo temporibus magni esse
							molestias in? Consequuntur corrupti magni dolore error incidunt.
						</p>
						<UploadButton
							id='new-notification-upload-button'
							acceptsFile='image/png'
							onAddImages={this.handleUploadImage}
						/>
						<ImageGallery
							imageFiles={this.state.photos}
							editable
							onRemoveImage={this.handleRemoveImage}
						/>
					</section>
					<section className='button-section'>
						<Button type='submit' color='blue' onClick={this.handleCreateNotification}>
							Zapisz zgłoszenie
						</Button>
					</section>
				</Form>
			</div>
		)
	}
}

export default NewNotification
