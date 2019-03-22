import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../assets/images/logo.svg'
import './App.css'

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
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className='App-link'
						href='https://reactjs.org'
						rel='noopener noreferrer'
						target='_blank'
					>
						Learn React
						{stest ? <div /> : <div>fdgjd ndk gdfsdsff dfdfdfdi</div>}
					</a>
				</header>
			</div>
		)
	}
}

export default App
