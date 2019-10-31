import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ id, placeholder, label, labelType, inputRef, ...rest }) => (
	<div className={`input-wrapper input-wrapper--${labelType}`}>
		<input
			{...rest}
			ref={inputRef}
			data-animate={labelType === 'floating'}
			className='input-wrapper__field'
			id={id}
			placeholder={placeholder}
		/>
		{label && (
			<label className={`input-wrapper__label input-wrapper__label--${labelType}`} htmlFor={id}>
				{label}
			</label>
		)}
	</div>
)

Input.defaultProps = {
	label: '',
	inputRef: () => {},
	placeholder: '',
	labelType: 'basic',
}

Input.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	labelType: PropTypes.oneOf(['basic', 'floating', 'solid']),
	inputRef: PropTypes.func,
}

export default Input
