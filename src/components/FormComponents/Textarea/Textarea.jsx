import React from 'react'
import PropTypes from 'prop-types'

const Textarea = ({ id, placeholder, children, floatingLabel, ...rest }) => (
	<div className='input-wrapper'>
		<textarea
			{...rest}
			data-animate={floatingLabel}
			className='input-wrapper__field'
			id={id}
			placeholder={placeholder}
		/>
		<label className='input-wrapper__label' htmlFor={id}>
			{children}
		</label>
	</div>
)

Textarea.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	floatingLabel: PropTypes.bool.isRequired,
}

export default Textarea
