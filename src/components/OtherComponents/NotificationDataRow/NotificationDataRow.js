import React from 'react'
import PropTypes from 'prop-types'

import './NotificationDataRow.scss'

const NotificationDataRow = ({ label, content, linear, vertical, editable }) => (
	<div
		className={`description__wrapper description__wrapper--${(vertical && 'vertical') ||
			(linear && 'linear')}`}
	>
		{!editable ? (
			<>
				<label className='description__header'>{label}</label>
				<textarea className='description__data'>{content}</textarea>
			</>
		) : (
			<>
				<p className='description__header'>{label}</p>
				<p className='description__data'>{content}</p>
			</>
		)}
	</div>
)

NotificationDataRow.defaultProps = {
	linear: true,
	vertical: false,
	editable: true,
}

NotificationDataRow.propTypes = {
	color: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	linear: PropTypes.bool,
	vertical: PropTypes.bool,
	editable: PropTypes.bool,
}

export default NotificationDataRow
