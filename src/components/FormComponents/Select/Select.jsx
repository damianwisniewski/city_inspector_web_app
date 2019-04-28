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
		e.preventDefault()
		if (this.field.contains(e.target) || this.label.contains(e.target)) {
			this.setState({ focused: true })
		} else {
			this.setState({ focused: false })
		}
	}

	setValue = e => {
		const { onSelectOption } = this.props
		this.setState({ selected: e.target.textContent })
		if (onSelectOption) onSelectOption(e)
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
						className='field__output'
						ref={field => (this.field = field)}
						id={id}
						value={selected}
						onChange={() => {}}
					>
						{children}
					</select>
					<ul data-amount={3} className='input-wrapper__select-list'>
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
	onSelectOption: PropTypes.func.isRequired,
}

export default Select
