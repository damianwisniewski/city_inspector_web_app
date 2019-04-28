import React from 'react'
import PropTypes from 'prop-types'

const Textarea = ({ id, placeholder, label, floatingLabel, ...rest }) => (
	<div className='input-wrapper'>
		<textarea
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

Textarea.propTypes = {
	label: '',
}

Textarea.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	label: PropTypes.string,
	floatingLabel: PropTypes.bool.isRequired,
}

export default Textarea
