import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Tooltip.scss'

class Tooltip extends Component {
	constructor(props) {
		super(props)
		this.htmlRef = React.createRef()
	}

	componentDidMount() {
		this.htmlRef.current.parentNode.classList.add('drop-down-parent')
	}

	render() {
		const { positionVertical, positionHorizontal, hoverable, show } = this.props

		return (
			<div
				ref={this.htmlRef}
				className={`drop-down drop-down--${positionVertical}-${positionHorizontal}${
					hoverable ? ' drop-down--hoverable' : ''
				}${show ? ' drop-down--show' : ''}`}
			>
				{this.props.children}
			</div>
		)
	}
}

Tooltip.defaultProps = {
	positionVertical: 'bottom',
	positionHorizontal: 'center',
	hoverable: true,
	show: false,
}

Tooltip.propTypes = {
	children: PropTypes.node.isRequired,
	positionVertical: PropTypes.oneOf(['top', 'bottom']),
	positionHorizontal: PropTypes.oneOf(['left', 'center', 'right']),
	hoverable: PropTypes.bool,
	show: PropTypes.bool,
}

export default Tooltip
