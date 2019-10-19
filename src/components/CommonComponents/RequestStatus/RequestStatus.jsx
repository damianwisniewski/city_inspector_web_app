import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './RequestStatus.scss'

// Components
import Loader from '../Loader/Loader'
import Status from '../Status/Status'

const RequestStatus = ({
	id,
	children,
	requestState,
	errorMessage,
	direction,
	size,
	fullview,
	color,
}) => (
	<Fragment>
		{requestState === 'succeeded' ? (
			children
		) : (
			<div
				className={`StatusScreen StatusScreen--${color}${
					fullview ? ' StatusScreen--fullview' : ''
				}`}
			>
				{requestState === 'pending' && <Loader size={size} id={`${id}-loader`} />}
				{requestState === 'failed' && (
					<Status id={`${id}-status`} position={direction} type='error' message={errorMessage} />
				)}
			</div>
		)}
	</Fragment>
)

RequestStatus.defaultProps = {
	direction: 'horizontal',
	size: 'medium',
	errorMessage: 'Przepraszamy coś poszło nie tak!',
	color: 'transparent',
	fullview: false,
}

RequestStatus.propTypes = {
	requestState: PropTypes.string.isRequired,
	errorMessage: PropTypes.string,
	direction: PropTypes.oneOf(['horizontal', 'vertical']),
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	color: PropTypes.oneOf(['transparent', 'blue']),
	fullview: PropTypes.bool,
}

export default RequestStatus
