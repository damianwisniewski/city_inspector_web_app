import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ id, placeholder, label, floatingLabel, inputRef, ...rest }) => (
	<div className='input-wrapper'>
		<input
			{...rest}
			ref={inputRef}
			data-animate={floatingLabel}
			className='input-wrapper__field'
			id={id}
			placeholder={placeholder}
		/>
		<label className='input-wrapper__label' htmlFor={id}>
			{label}
		</label>
	</div>
)

Input.defaultProps = {
	label: '',
	inputRef: () => {},
	placeholder: '',
	floatingLabel: false,
}

Input.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	floatingLabel: PropTypes.bool,
	inputRef: PropTypes.func,
}

export default Input
