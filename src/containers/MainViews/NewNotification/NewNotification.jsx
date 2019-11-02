import React, { Component } from 'react'

// SCSS
import './NewNotification.scss'
import icons from '../../../assets/styleModules/icons.module.scss'

// Components
import { Form, Select, Input, Textarea, UploadButton } from '../../../components/FormComponents'
import { MapLayout, MapMarker, MapLocateMe } from '../../../components/MapComponents'
import { ImageGallery, Button } from '../../../components/CommonComponents'

class NewNotification extends Component {
	state = {
		category: 'Niebezpieczne Miejsca',
		title: '',
		description: '',
		city: '',
		street: '',
		number: '',
		post: '',
		localization: [52.2297, 21.0122],
		photos: [],
	}

	componentDidMount() {
		document.title = `Nowe zgłoszenie | ${process.env.REACT_APP_TITLE}`
	}

	/**
	 * Handler for mover marker on Map
	 */
	handlePointerMove = e => {
		const { lat, lng } = e.target.getLatLng()
		this.setState({ localization: [lat, lng] })
	}

	/**
	 * Handler for upload image
	 */
	handleUploadImage = (eventData = []) => {
		this.setState({ photos: [...this.state.photos, ...eventData] })
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
		this.setState({ localization: locCoords })
	}

	render() {
		const { category, title, description, city, post, street, number } = this.state

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
							data-state-name='title'
							value={title}
							onChange={this.handleFormFieldChanges}
							label='Tytuł:'
							placeholder='Wpisz tytuł dla zgłoszenia'
						/>
						<Textarea
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
								data-state-name='street'
								value={street}
								onChange={this.handleFormFieldChanges}
								label='Ulica:'
								placeholder='Wpisz nazwę ulicy...'
							/>
							<Input
								data-state-name='number'
								value={number}
								onChange={this.handleFormFieldChanges}
								label='Numer'
								placeholder='Podaj number domu / mieszkania...'
							/>
						</div>
						<div className='section__row'>
							<Input
								data-state-name='city'
								value={city}
								onChange={this.handleFormFieldChanges}
								label='Miasto:'
								placeholder='Wpisz nazwę miasta...'
							/>
							<Input
								data-state-name='post'
								value={post}
								onChange={this.handleFormFieldChanges}
								label='Kod pocztowy:'
								placeholder='Wpisz kod pocztowy...'
							/>
						</div>
						<section className='section__map'>
							<MapLayout center={this.state.localization} zoom={10}>
								<MapMarker
									popupEnabled={false}
									onDragEnd={this.handlePointerMove}
									position={this.state.localization}
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
						<UploadButton acceptsFile='image/png' onAddImages={this.handleUploadImage} />
						<ImageGallery
							imgSources={this.state.photos}
							editable
							onRemoveImage={this.handleRemoveImage}
						/>
					</section>
					<section className='button-section'>
						<Button type='submit' color='blue'>
							Zapisz zgłoszenie
						</Button>
					</section>
				</Form>
			</div>
		)
	}
}

export default NewNotification
