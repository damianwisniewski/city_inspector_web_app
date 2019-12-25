import React from 'react'
import { connect } from 'react-redux'

// SCSS
import './LogoutModal.scss'

// Components
import { Button } from '../../../components/CommonComponents'

// Actions
import { sagaRequestLogout } from '../../../reduxStore/actionCreators/requestActions'

const LogoutModal = ({ closeModal, onSagaRequestLogout }) => {
	/**
	 * Handler on click, logout confirm
	 */
	const handleLogout = () => {
		onSagaRequestLogout()
		closeModal()
	}

	return (
		<div id='logout-modal' className='logout'>
			<h2 className='logout__header'>Wyloguj</h2>
			<p className='logout__context'>Czy jesteś pewien że chcesz się wylogować?</p>
			<div className='logout__buttons-wrapper'>
				<Button id='logout-cancel' color='blue' onClick={closeModal}>
					Nie
				</Button>
				<Button id='logout-confirm' color='white' onClick={handleLogout}>
					Tak
				</Button>
			</div>
		</div>
	)
}

export default connect(
	null,
	{ onSagaRequestLogout: sagaRequestLogout },
)(LogoutModal)
