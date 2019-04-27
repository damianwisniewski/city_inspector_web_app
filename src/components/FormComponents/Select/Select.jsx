import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Select.scss'

class Select extends Component {
	state = {
		focused: false,
		selected: '',
	}

	componentDidMount() {
		this.setState({ selected: this.props.options[0] })
		document.addEventListener('click', this.toggleSelectFocus)
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.toggleSelectFocus)
	}

	toggleSelectFocus = e => {
		if (this.field.contains(e.target) || this.label.contains(e.target)) {
			this.setState({ focused: true })
		} else {
			this.setState({ focused: false })
		}
	}

	setValue = e => {
		this.setState({ selected: e.target.textContent })
		this.props.onSelectOption(e)
	}

	render() {
		const { options, id, children, ...rest } = this.props
		const { focused, selected } = this.state
		const focusClass = focused ? 'input-wrapper__field--focused' : ''

		return (
			<div className='input-wrapper input-wrapper--select'>
				<div className={`input-wrapper__field input-wrapper__field--select ${focusClass}`}>
					<p {...rest} className='field__output' ref={field => (this.field = field)} id={id}>
						{selected}
					</p>
					<ul data-amount={3} className='input-wrapper__select-list'>
						{options.map((option, index) => (
							<li data-type='list-item' onClick={this.setValue} key={option + '_' + index}>
								{option}
							</li>
						))}
					</ul>
				</div>
				<span ref={label => (this.label = label)} className='input-wrapper__label' htmlFor={id}>
					{children}
				</span>
			</div>
		)
	}
}

Select.propTypes = {
	id: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	children: PropTypes.string.isRequired,
	onSelectOption: PropTypes.func.isRequired,
}

export default Select
