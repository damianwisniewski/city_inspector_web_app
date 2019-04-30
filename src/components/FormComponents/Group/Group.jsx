import React from 'react'
import PropTypes from 'prop-types'

import './Group.scss'

const Group = ({ name, direction, children }) => (
	<section data-name={name} className={`form-group form-group--${direction}`}>
		{children}
	</section>
)

Group.defaultProps = {
	direction: 'column',
}

Group.propTypes = {
	name: PropTypes.string.isRequired,
	direction: PropTypes.string,
	children: PropTypes.node.isRequired,
}

export default Group
