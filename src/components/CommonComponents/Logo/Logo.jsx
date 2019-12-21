import React from 'react'
import PropTypes from 'prop-types'

// Scss
import './Logo.scss'

// Images
import logo from '../../../assets/images/logo.svg'

const Logo = ({ title, size }) => (
	<div className={`logo logo--${size}`} data-title={title}>
		<img src={logo} className='logo__image' alt='logo' />
	</div>
)

export default Logo

Logo.defaultProps = {
	title: '',
	size: 'small',
}

Logo.propTypes = {
	title: PropTypes.string,
	size: PropTypes.oneOf(['small', 'large']),
}
