import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// SCSS
import './NotificationChangesModal.scss'

class NotificationChangesModal extends Component {
	/**
	 * TODO: Component to notify about changes in subscribed notifications
	 * Idea to use WebSockets to be always up-to-date
	 */

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

export default NotificationChangesModal
