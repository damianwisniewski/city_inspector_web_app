import React from 'react'
import PropTypes from 'prop-types'

import './Loader.scss'

const Loader = ({ id, size }) => {
	return <div id={id} className={`Loader Loader--${size}`} />
}

Loader.defaultProps = {
	size: 'medium',
}

Loader.propTypes = {
	size: PropTypes.oneOf(['small', 'medium', 'large']),
}

export default Loader
