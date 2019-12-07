import React from 'react'
// import PropTypes from 'prop-types'

import './CommentList.scss'

// import { Textarea } from '../../FormComponents'

const CommentList = ({ comments }) => {
	const parseTime = timestring => {
		const date = new Date(timestring)
		return date.toLocaleString()
	}

	return comments.length ? (
		<ul className='comment-list'>
			{comments.map(({ text, nickname, createdAt }) => {
				return (
					<li className='comment'>
						<div className='comment__header-wrapper'>
							<p className='comment__header'>
								<p>Autor: </p>
								{nickname}
							</p>
							<p className='comment__header'>
								<p>Data wystawienia: </p>
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
