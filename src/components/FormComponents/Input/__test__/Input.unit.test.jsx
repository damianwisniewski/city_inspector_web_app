import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Input from '../Input'

configure({ adapter: new Adapter() })

describe('<Input />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let InputElement
	const InputText = 'mockText'
	const id = 'mockId'
	const placeholder = 'mock placeholder'

	test('should render correctly Input, with floatingLabel value equal true', () => {
		InputElement = shallow(
			<Input floatingLabel placeholder={placeholder} id={id} label={InputText} />,
		)
		expect(toJson(InputElement)).toMatchSnapshot()
	})

	test('should render correctly Input, with floatingLabel value equal false', () => {
		InputElement = shallow(
			<Input labelType='basic' placeholder={placeholder} id={id} label={InputText} />,
		)
		expect(toJson(InputElement)).toMatchSnapshot()
	})
})
