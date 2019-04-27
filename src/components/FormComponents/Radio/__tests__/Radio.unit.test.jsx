import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Radio from '../Radio'

configure({ adapter: new Adapter() })

describe('<Radio />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let RadioElement
	const RadioText = 'mockText'
	const id = 'mockId'

	test('should render correctly Radio', () => {
		RadioElement = shallow(<Radio id={id}>{RadioText}</Radio>)
		expect(toJson(RadioElement)).toMatchSnapshot()
	})
})
