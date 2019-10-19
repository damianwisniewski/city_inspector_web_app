import React from 'react'
import PropTypes from 'prop-types'

import { Form, Textarea } from '../../FormComponents'
import Button from '../../CommonComponents/Button/Button'

import './NewComment.scss'

const NewComment = () => (
	<Form>
		<Textarea label='Napisz swój komentarz:' className='textfield' />
		<Button type='submit' color='blue'>
			Zatwierdź
		</Button>
	</Form>
)

NewComment.defaultProps = {}

NewComment.propTypes = {}

export default NewComment
