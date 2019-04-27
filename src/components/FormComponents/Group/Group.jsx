import React from 'react'
import PropTypes from 'prop-types'

import './Group.scss'

const Group = ({ name, children }) => (
	<section data-name={name} className='form-group'>
		{children}
	</section>
)

Group.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
}

export default Group
