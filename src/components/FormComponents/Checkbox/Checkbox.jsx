import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ id, label, ...rest }) => (
	<div className='input-wrapper'>
		<input {...rest} type='checkbox' className='input-wrapper__field' id={id} />
		<label className='input-wrapper__label' htmlFor={id}>
			{label}
		</label>
	</div>
)

Checkbox.defaultProps = {
	label: '',
}

Checkbox.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.node,
}

export default Checkbox
