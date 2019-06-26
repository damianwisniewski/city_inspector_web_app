import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './assets/globalStyles/globalStyles.scss'

import App from './containers/App/App'

import reduxStore from './reduxStore'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	<Provider store={reduxStore}>
		<App />
	</Provider>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
