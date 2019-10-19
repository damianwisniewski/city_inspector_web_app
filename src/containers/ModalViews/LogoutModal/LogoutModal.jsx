import React from 'react'
import Button from '../../../components/CommonComponents/Button/Button'
import { connect } from 'react-redux'
import { sagaRequestLogout } from '../../../reduxStore/actionCreators/requestActions'

import './LogoutModal.scss'

const LogoutModal = ({ closeModal, onSagaRequestLogout }) => {
	const handleLogout = () => {
		onSagaRequestLogout()
		closeModal()
	}

	return (
		<div id='logout-modal' className='logout'>
			<h2 className='logout__header'>Wyloguj</h2>
			<p className='logout__context'>Czy jesteś pewien że chcesz się wylogować?</p>
			<div className='logout__buttons-wrapper'>
				<Button color='blue' onClick={closeModal}>
					Nie
				</Button>
				<Button color='white' onClick={handleLogout}>
					Tak
				</Button>
			</div>
		</div>
	)
}

// LogoutModal.propTypes = {}

export default connect(
	null,
	{ onSagaRequestLogout: sagaRequestLogout },
)(LogoutModal)
