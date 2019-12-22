import React, { Component } from 'react'
import { connect } from 'react-redux'

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

		if (formData.title && formData.description && formData.city) {
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
				.then(res => this.props.history.push(`/zgloszenie/${res.id}`))
				.catch(err => console.error(err))
		}
	}

	render() {
		const { category, title, description, city, post, street, number, lat, lng } = this.state
		const { isMobile } = this.props

		return (
			<div id='NewNotification' className='new-notification'>
				<Form onSubmit={this.handleCreateNotification}>
					<section className='section category-section'>
						<h2 className='section__header'>Kategoria</h2>
						<p className='section__description'>
							Wybierz kategorię dla problemu który chcesz zgłosić. Poprawnie przydzielona kategoria
							ułatwi odnalezienie zgłoszenia, przez właściwe osoby, a w konsekwencji może przyczynić
							się do szybszego rozwiązania problemu.
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
								Niebezpieczne miejsca, kategoria dotycząca wszelkich problemów które z jakiś
								powodów, mogą zagrażać życiu lub bezpieczeństwu innych osób.
							</p>
							<p className={`legend__option ${icons.nature}`}>
								Zaniedbana zieleń, tą kategorią oznaczany wszystkie miejsca które uważamy za
								zaniedbane, jak np. zarastające ścieżki w parkach.
							</p>
							<p className={`legend__option ${icons.damage}`}>
								Uszkodzenia, dotyczą wszelkich sytuacji, w których natrafimy na problemy wymagające
								naprawy np. zdewastowana chuśtawka w parku, rozbite lustro drogowe.
							</p>
							<p className={`legend__option ${icons.trashes}`}>
								Zanieczyszczona przestrzeń, przewidziana jest dla oznaczenia przypadków gdy,
								zaobserwujemy miejsca wymagające posprzątania, np. duże ilości śmieci.
							</p>
						</div>
					</section>
					<section className='section description-section'>
						<h2 className='section__header'>Opis</h2>
						<p className='section__description'>
							Dodaj tytuł złoszenia i postaraj się opisać problem w paru zdaniach. Większa ilość
							szczegółów pozwoli szybciej przekazać zawiadomienie do właściwych służb i w
							konsekwencji, przyczyni się do szybszego rozwiązania problemu.
						</p>
						<Input
							id='new-notification-title'
							data-state-name='title'
							value={title}
							onChange={this.handleFormFieldChanges}
							label='Tytuł: *'
							placeholder='Wpisz tytuł dla zgłoszenia'
							required
						/>
						<Textarea
							id='new-notification-description'
							data-state-name='description'
							value={description}
							onChange={this.handleFormFieldChanges}
							label='Opis miejsa: *'
							placeholder='Wpisz opis dotyczący zgłaszanego miejsca'
							className='section__desctiption-field'
							required
						/>
					</section>
					<section className='section localization-section'>
						<h2 className='section__header'>Lokalizacja</h2>
						<p className='section__description'>
							Podaj możliwie najdokładniejszą lokalizacje, gdzie zaobserwowano problem, aby ułatwić
							właściwym słubom, zlokalizowanie miesca wymagającego ich interwencji. Najbardziej
							pomocne jest oczywiście oznaczenie miejsca na mapie, jednak prosimy również o podanie
							pozostałych danych, a przynajmniej miasta. Pomoże to we włąściwym filtrowaniu
							zgłoszeń.
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
								label='Miasto: *'
								placeholder='Wpisz nazwę miasta...'
								required
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
							Często jednak najlepszym sposobem na przedstawienie czegoś jest obraz. Zatem zachęcamy
							do skorzystania, z moliowści dodania zdjęć aby przedstawić jeszcze lepiej zilustrować
							zaistniały problem.
						</p>
						<UploadButton
							id='new-notification-upload-button'
							acceptsFile='image/*'
							onAddImages={this.handleUploadImage}
							isMobile={isMobile}
						/>
						<ImageGallery
							imageFiles={this.state.photos}
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

function mapStateToProps(state) {
	return {
		isMobile: state.env.isMobile,
	}
}

export default connect(mapStateToProps)(NewNotification)
