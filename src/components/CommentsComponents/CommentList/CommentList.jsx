import React from 'react'

import './CommentList.scss'

const CommentList = ({ comments }) => {
	const parseTime = timestring => {
		const date = new Date(timestring)
		return date.toLocaleString()
	}

	return comments.length ? (
		<ul className='comment-list'>
			{comments.map(({ text, nickname, createdAt }, index) => {
				return (
					<li key={nickname + index} className='comment'>
						<div className='comment__header-wrapper'>
							<p className='comment__header'>
								<span>Autor: </span>
								{nickname}
							</p>
							<p className='comment__header'>
								<span>Data wystawienia: </span>
								{parseTime(createdAt)}
							</p>
						</div>
						<p className='comment__text'>{text}</p>
					</li>
				)
			})}
		</ul>
	) : (
		<p>Brak komentarzy...</p>
	)
}

CommentList.defaultProps = {}

CommentList.propTypes = {}

export default CommentList
