import React, { Component } from 'react'
import PropTypes from 'prop-types'

// SCSS
import './SearchField.scss'
import { exit } from '../../../assets/styleModules/icons.module.scss'

class SearchField extends Component {
	static chipsColorModifications = ['red', 'blue', 'yellow', 'green', 'gray']

	constructor(props) {
		super(props)

		this.state = {
			searchCategory: props.categories[0],
			searchContent: '',
			selectedValues: [],
		}

		this.categoriesColors = props.categories.reduce((object, category, index) => {
			const amountOfColorModifications = SearchField.chipsColorModifications.length
			const isBasicModificationsAvailable = amountOfColorModifications > index

			const additionalModifications = {
				color: SearchField.chipsColorModifications[index % amountOfColorModifications],
				intensity: isBasicModificationsAvailable
					? ''
					: index / amountOfColorModifications >= 2
					? '-dark'
					: '-light',
			}

			object[category] = additionalModifications.color + additionalModifications.intensity
			return object
		}, {})
	}

	handleSubmit = e => {
		e.preventDefault()

		const { searchCategory, searchContent, selectedValues } = this.state
		const { onSearchChange } = this.props

		if (!searchContent) return

		const newValue = {
			searchCategory,
			searchContent,
		}
		const newSelectedValuesList = [...selectedValues, newValue]

		this.setState(
			{
				selectedValues: newSelectedValuesList,

				searchContent: '',
			},
			onSearchChange({
				selectedValues: newSelectedValuesList,
				newValue,
			}),
		)
	}

	handleDelete = e => {
		const { onSearchChange } = this.props
		const chipIndex = e.target.dataset.chip
		const selectedValues = [...this.state.selectedValues]

		const deletedValue = selectedValues.splice(chipIndex, 1)

		this.setState(
			{ selectedValues },
			onSearchChange({ selectedValues, deletedValue: deletedValue[0] }),
		)
	}

	onFieldValueChange = e => {
		const target = e.target

		this.setState({
			[target.dataset.type]: target.value,
		})
	}

	render() {
		const { categories } = this.props
		const { searchCategory, searchContent, selectedValues } = this.state

		return (
			<div className='search-field'>
				<form className='search-field__form' onSubmit={this.handleSubmit}>
					<select
						data-type='searchCategory'
						onChange={this.onFieldValueChange}
						className='search-field__select'
						value={searchCategory}
						name=''
						id=''
					>
						{categories.map((category, index) => (
							<option key={category + index}>{category}</option>
						))}
					</select>
					<input
						data-type='searchContent'
						className='search-field__input'
						onChange={this.onFieldValueChange}
						value={searchContent}
						type='text'
					/>
				</form>
				<div className='search-field__chips-wrapper'>
					{Boolean(selectedValues.length) &&
						selectedValues.map(({ searchCategory: category, searchContent: content }, index) => (
							<div
								key={category + index}
								data-chip={index}
								onClick={this.handleDelete}
								className={`${exit} search-field__chip search-field__chip--${
									this.categoriesColors[category]
								}`}
							>
								{category}: {content}
							</div>
						))}
				</div>
			</div>
		)
	}
}

SearchField.defaultProps = {
	onSearchChange: () => {},
}

SearchField.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.string).isRequired,
	onSearchChange: PropTypes.func,
}

export default SearchField
