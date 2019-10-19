import React from 'react'

import './CommentsWrapper.scss'

import NewComment from '../NewComment/NewComment'
import CommentList from '../CommentList/CommentList'

const CommentsWrapper = ({ comments }) => (
	<div className='comments-container'>
		<h3>Komentarze: </h3>
		<CommentList comments={comments} />
		<NewComment />
	</div>
)

export default CommentsWrapper
