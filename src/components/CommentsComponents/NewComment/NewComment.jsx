import React from 'react'

import { Form, Textarea } from '../../FormComponents'
import { Button } from '../../CommonComponents'

import './NewComment.scss'

const NewComment = ({ value, onCommentChange, onSubmitComment }) => (
	<Form onSubmit={onSubmitComment}>
		<Textarea
			id={'new-comment' + Date.now()}
			label='Napisz swój komentarz:'
			className='textfield'
			value={value}
			onChange={onCommentChange}
		/>
		<Button type='submit' color='blue'>
			Zatwierdź
		</Button>
	</Form>
)

// NewComment.defaultProps = {}

// NewComment.propTypes = {}

export default NewComment
