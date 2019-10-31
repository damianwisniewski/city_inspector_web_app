import React from 'react'
import PropTypes from 'prop-types'

const Textarea = ({ id, placeholder, label, labelType, className, ...rest }) => (
	<div className='input-wrapper'>
		<textarea
			data-animate={labelType === 'floating'}
			className={'input-wrapper__field' + (className ? ' ' + className : '')}
			id={id}
			placeholder={placeholder}
			{...rest}
		/>
		{label && (
			<label className={`input-wrapper__label input-wrapper__label--${labelType}`} htmlFor={id}>
				{label}
			</label>
		)}
	</div>
)

Textarea.propTypes = {
	label: '',
	placeholder: '',
	labelType: 'basic',
}

Textarea.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	labelType: PropTypes.oneOf(['basic', 'floating', 'solid']),
}

export default Textarea
