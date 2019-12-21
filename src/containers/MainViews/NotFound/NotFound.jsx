import React from 'react'

import './NotFound.scss'

const Settings = () => {
	document.title = `404 - Not Found | ${process.env.REACT_APP_TITLE}`

	return (
		<div id='NotFound' className='not-found'>
			<p>404 - Not Found</p>
			<p>Wygląda na to że zabłądziłeś!</p>
		</div>
	)
}

export default Settings
