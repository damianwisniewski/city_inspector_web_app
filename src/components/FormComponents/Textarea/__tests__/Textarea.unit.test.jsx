import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Textarea from '../Textarea'

configure({ adapter: new Adapter() })

describe('<Textarea />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let TextareaElement
	const TextareaContent = 'mockTextarea'
	const id = 'mockId'
	const placeholder = 'mock placeholder'

	test('should render correctly Textarea, with floatingLabel value equal true', () => {
		TextareaElement = shallow(
			<Textarea floatingLabel placeholder={placeholder} id={id} label={TextareaContent} />,
		)
		expect(toJson(TextareaElement)).toMatchSnapshot()
	})

	test('should render correctly Textarea, with floatingLabel value equal false', () => {
		TextareaElement = shallow(
			<Textarea labelType='basic' placeholder={placeholder} id={id} label={TextareaContent} />,
		)
		expect(toJson(TextareaElement)).toMatchSnapshot()
	})
})
