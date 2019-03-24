import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../assets/images/logo.svg'
import './App.scss'

class App extends Component {
	static defaultProps = {
		cos: true,
		cos2: 'et',
	}

	static propTypes = {
		stest: PropTypes.string.isRequired,
		cos: PropTypes.bool,
		cos2: PropTypes.string,
	}

	render() {
		const { stest } = this.props
		return (
			<div className='App'>
				<nav>
					<ul>
						<li>test</li>
					</ul>
				</nav>
			</div>
		)
	}
}

export default App
