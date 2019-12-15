import React from 'react'

import './CommentsWrapper.scss'

const CommentsWrapper = ({ children }) => (
	<div className='comments-container'>
		<h3>Komentarze: </h3>
		{children}
	</div>
)

export default CommentsWrapper
