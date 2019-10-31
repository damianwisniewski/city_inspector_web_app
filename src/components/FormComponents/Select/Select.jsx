import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Select.scss'

class Select extends Component {
	static option = ({ children, ...rest }) => <option {...rest}>{children}</option>

	state = {
		focused: false,
		selected: '',
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.toggleSelectFocus)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.toggleSelectFocus)
	}

	toggleSelectFocus = e => {
		// Prevent default actions for select button only
		if (e.target.dataset.type === 'select-field') {
			e.preventDefault()
		}

		/**
		 * Focus and do not loose focus on select button,
		 * when you click custom option list (ul tag or li tags)
		 */
		if (this.field.contains(e.target) || this.label.contains(e.target)) {
			this.setState({ focused: true })
		} else {
			this.setState({ focused: false })
		}
	}

	setValue = e => {
		e.persist()

		const { onChange } = this.props
		this.setState({ selected: e.target.textContent }, () => {
			if (onChange) {
				e.target = this.field
				onChange(e)
			}
		})
	}

	render() {
		const { id, children, label, ...rest } = this.props
		const { focused, selected } = this.state
		const focusClass = focused ? 'input-wrapper__field--focused' : ''

		return (
			<div className='input-wrapper input-wrapper--select'>
				<div className={`input-wrapper__field input-wrapper__field--select ${focusClass}`}>
					<select
						{...rest}
						data-type='select-field'
						className='field__output'
						ref={field => (this.field = field)}
						id={id}
						value={selected}
					>
						{children}
					</select>
					<ul className='input-wrapper__select-list'>
						{children.map((option, index) => (
							<li data-type='list-item' onClick={this.setValue} key={option + '_' + index}>
								{option.props.children}
							</li>
						))}
					</ul>
				</div>
				<label ref={label => (this.label = label)} className='input-wrapper__label' htmlFor={id}>
					{label}
				</label>
			</div>
		)
	}
}

Select.defaultProps = {
	label: '',
}

Select.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
}

export default Select
