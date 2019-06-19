import React from 'react'
import PropTypes from 'prop-types'

import iconAssets from '../../../assets/styleModules/icons.module.scss'
import './Status.scss'

const Status = ({ id, message, type, position }) => {
	return (
		<p
			id={id}
			className={`status-component status-component--${type} status-component--${position} ${
				iconAssets[type]
			}`}
		>
			{message}
		</p>
	)
}

Status.defaultProps = {
	message: '',
	position: 'horizontal',
}

Status.propTypes = {
	message: PropTypes.string,
	type: PropTypes.oneOf(['error', 'warning', 'correct']).isRequired,
	position: PropTypes.oneOf(['horizontal', 'vertical']),
}

export default Status
