import React from 'react'
import PropTypes from 'prop-types'

// SCSS
import './ConfirmModal.scss'

// COMPONENTS
import Modal from '../../ModalComponents/Modal/Modal'
import Button from '../Button/Button'

const ConfirmModal = ({ children, onCancel, onConfirm }) => (
	<Modal darkOverlay closeButton onButtonClose={onCancel} onOverlayClick={onCancel}>
		<section className='delete__confirm'>
			{children}
			<div className='delete__confirm__buttons-wrapper'>
				<Button color='white' onClick={onCancel}>
					Anuluj
				</Button>
				<Button color='red' onClick={onConfirm}>
					Tak
				</Button>
			</div>
		</section>
	</Modal>
)

ConfirmModal.Header = ({ children }) => <h2 className='delete__confirm__header'>{children}</h2>
ConfirmModal.Content = ({ children }) => <p className='delete__confirm__context'>{children}</p>

ConfirmModal.propTypes = {
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
}

export default ConfirmModal
