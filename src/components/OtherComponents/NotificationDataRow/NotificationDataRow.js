import React from 'react'
import PropTypes from 'prop-types'

import './NotificationDataRow.scss'

const NotificationDataRow = ({ label, content, linear, vertical }) => (
	<div
		className={`description__wrapper description__wrapper--${(vertical && 'vertical') ||
			(linear && 'linear')}`}
	>
		<p className='description__header'>{label}</p>
		<p className='description__data'>{content}</p>
	</div>
)

NotificationDataRow.defaultProps = {
	linear: true,
	vertical: false,
}

NotificationDataRow.propTypes = {
	color: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	linear: PropTypes.bool,
	vertical: PropTypes.bool,
}

export default NotificationDataRow
