import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ id, children, ...rest }) => (
	<div className='input-wrapper'>
		<input {...rest} type='checkbox' className='input-wrapper__field' id={id} />
		<label className='input-wrapper__label' htmlFor={id}>
			{children}
		</label>
	</div>
)

Checkbox.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
}

export default Checkbox
