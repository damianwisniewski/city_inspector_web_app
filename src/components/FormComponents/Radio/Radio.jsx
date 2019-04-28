import React from 'react'
import PropTypes from 'prop-types'

const Radio = ({ id, label, ...rest }) => (
	<div className='input-wrapper'>
		<input {...rest} type='radio' className='input-wrapper__field' id={id} />
		<label className='input-wrapper__label' htmlFor={id}>
			{label}
		</label>
	</div>
)

Radio.defaultProps = {
	label: '',
}

Radio.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
}

export default Radio
