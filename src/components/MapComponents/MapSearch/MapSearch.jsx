import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DomEvent } from 'leaflet'
import { withLeaflet } from 'react-leaflet'

import './MapSearch.scss'
import styles from '../../../assets/styleModules/icons.module.scss'

import { debounce } from '../../../helpers'

import Status from '../../CommonComponents/Status/Status'

class MapSearch extends Component {
	state = {
		searchResult: [],
		searchValue: '',
		focused: false,
		pending: false,
		error: false,
	}

	handleSearchChange = e => {
		this.setState(
			{ searchValue: e.target.value, pending: true, error: false },
			this.getAutocompletionData,
		)
	}

	getAutocompletionData = debounce(() => {
		fetch(
			`https://geocoder.tilehosting.com/pl/q/${this.state.searchValue}.js?key=wa2ERdrAv6aWnd9IrOen`,
		)
			.then(res => res.json())
			.then(res => res.results.filter(place => place.type === 'city'))
			.then(res => this.setState({ searchResult: res }))
			.catch(() => this.setState({ error: true }))
			.then(() => this.setState({ pending: false }))
	}, 250)

	selectLocalization = e => {
		const searchArray = this.state.searchResult
		const searchItemIndex = e.target.dataset.loc || e.target.parentNode.dataset.loc
		const selectedLoc = searchArray[searchItemIndex]

		this.setState({ focused: false })
		this.props.onSelect(selectedLoc)
	}

	handleSearchLostFocus = e => {
		console.log(e)
		if (e.target.id !== 'search-list' || e.target.id !== 'search-form') {
			this.setState({ focused: false })
		}
	}

	handleFocusInput = () => {
		this.setState({ focused: true })
	}

	handleClickForm = e => {
		console.log(e.target)
	}

	handleSubmit = e => {
		e.preventDefault()
		const firstResult = this.state.searchResult[0]

		if (firstResult) {
			this.searchField.blur()
			this.setState({ focused: false })
			this.props.onSelect(firstResult)
		}
	}

	handleCloseSearchClick = () => {
		this.searchField.blur()
		this.setState({ focused: false })
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleSearchLostFocus)
		DomEvent.disableScrollPropagation(this.scrollWrapper)
		DomEvent.disableClickPropagation(this.scrollWrapper)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleSearchLostFocus)
	}

	render() {
		const { searchResult, focused, error } = this.state
		const { placeholder } = this.props

		return (
			<form
				ref={wrapper => (this.scrollWrapper = wrapper)}
				onFocus={this.handleFocusInput}
				onClick={this.handleClickForm}
				id='search-form'
				className={`leaflet-control leaflet-bar search${focused ? ' search--focused' : ''}`}
				onSubmit={this.handleSubmit}
			>
				{/* Button visible only on mobile, when form will stretch to full screen */}
				{focused && (
					<button className='search__close-button' onClick={this.handleCloseSearchClick}>
						Anuluj
					</button>
				)}
				<label
					htmlFor='city-search'
					className={`${
						this.state.pending ? styles['loader'] : styles['search-lock']
					} search__control`}
				>
					<input
						ref={searchField => (this.searchField = searchField)}
						autoComplete='off'
						onChange={this.handleSearchChange}
						value={this.state.searchValue}
						type='text'
						placeholder={placeholder}
						name='city-search'
						id='city-search'
						className='search__field'
					/>
				</label>
				{focused &&
					(error ? (
						<div className='search__list'>
							<Status
								type='error'
								position='vertical'
								message='Przepraszamy, coś poszło nie tak!'
							/>
						</div>
					) : (
						searchResult &&
						Boolean(searchResult.length) && (
							<ul id='search-list' className='search__list scroller'>
								{searchResult.map((result, index) => (
									<li
										key={`${result.name}_${index}`}
										data-loc={index}
										className='search__item'
										onClick={this.selectLocalization}
									>
										<p className='search__item-city'>{result.name}</p>
										<p className='search__item-region'>
											region: {result.name_suffix.split(',')[0]}
										</p>
									</li>
								))}
							</ul>
						)
					))}
			</form>
		)
	}
}

MapSearch.defaultProps = {
	label: '',
}

MapSearch.propTypes = {
	label: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
}

export default withLeaflet(MapSearch)
