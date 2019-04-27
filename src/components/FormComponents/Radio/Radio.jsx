import React from 'react'
import PropTypes from 'prop-types'

const Radio = ({ id, children, ...rest }) => (
	<div className='input-wrapper'>
		<input {...rest} type='radio' className='input-wrapper__field' id={id} />
		<label className='input-wrapper__label' htmlFor={id}>
			{children}
		</label>
	</div>
)

Radio.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
}

export default Radio
