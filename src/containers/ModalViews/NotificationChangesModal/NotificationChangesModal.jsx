import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

import './NotificationChangesModal.scss'

class NotificationChangesModal extends Component {
	render() {
		return (
			<div id='NotificationChangesModal' className='changes-modal'>
				<h2 className='changes-modal__header'>Sprawdź zmiany</h2>
				<div>
					<Link className='changes-modal__link' to={`/zgloszenie/`}>
						Sprawdź szczegóły zgłoszenia
					</Link>
				</div>
			</div>
		)
	}
}

// NotificationChangesModal.propTypes = {}

export default NotificationChangesModal
