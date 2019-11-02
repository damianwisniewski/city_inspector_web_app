import React from 'react'

const Settings = () => {
	document.title = `404 - Not Found | ${process.env.REACT_APP_TITLE}`

	return <div id='NotFound'>404 - NOT FOUND</div>
}

export default Settings
