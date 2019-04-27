import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// Components
import Loader from '../Loader/Loader'
import Status from '../Status/Status'

const RequestStatus = ({ id, requestState, children, errorMessage, direction }) => (
	<Fragment>
		{requestState === 'pending' && <Loader id={`${id}-loader`} />}
		{requestState === 'failed' && (
			<Status id={`${id}-status`} position={direction} type='error' message={errorMessage} />
		)}
		{requestState === 'succeeded' && children}
		{requestState === 'initial' && children}
	</Fragment>
)

RequestStatus.defaultProps = {
	direction: 'horizontal',
}

RequestStatus.propTypes = {
	requestState: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	errorMessage: PropTypes.string.isRequired,
	direction: PropTypes.string,
}

export default RequestStatus
