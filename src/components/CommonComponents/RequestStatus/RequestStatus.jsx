import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// Components
import Loader from '../Loader/Loader'
import Status from '../Status/Status'

const RequestStatus = ({ id, children, requestState, errorMessage, direction, size }) => (
	<Fragment>
		{requestState === 'pending' && <Loader size={size} id={`${id}-loader`} />}
		{requestState === 'failed' && (
			<Status id={`${id}-status`} position={direction} type='error' message={errorMessage} />
		)}
		{requestState === 'succeeded' && children}
	</Fragment>
)

RequestStatus.defaultProps = {
	direction: 'horizontal',
	size: 'medium',
	errorMessage: 'Przepraszamy coś poszło nie tak!',
}

RequestStatus.propTypes = {
	requestState: PropTypes.string.isRequired,
	errorMessage: PropTypes.string,
	direction: PropTypes.oneOf(['horizontal', 'vertical']),
	size: PropTypes.oneOf(['small', 'medium', 'large']),
}

export default RequestStatus
