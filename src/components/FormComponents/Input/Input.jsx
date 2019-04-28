import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ id, placeholder, label, floatingLabel, ...rest }) => (
	<div className='input-wrapper'>
		<input
			{...rest}
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
}

Input.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	label: PropTypes.string,
	floatingLabel: PropTypes.bool.isRequired,
}

export default Input
