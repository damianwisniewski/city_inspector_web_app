import { Component } from 'react'
import PropTypes from 'prop-types'
import { ModalContext } from '../ModalRouter/ModalRouter'

class ModalRedirect extends Component {
	static contextType = ModalContext

	componentDidMount() {
		const { to, ...rest } = this.props
		this.context.handleOpenModal(to, rest)
	}

	render() {
		return null
	}
}

ModalRedirect.propTypes = {
	to: PropTypes.string.isRequired,
}

export default ModalRedirect
