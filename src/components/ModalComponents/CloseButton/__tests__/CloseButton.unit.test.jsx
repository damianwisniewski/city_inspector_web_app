import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import CloseButton from '../CloseButton'

configure({ adapter: new Adapter() })

describe('(Modal) <CloseButton />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let CloseButtonComponent
	const onClose = jest.fn()

	beforeAll(() => {
		CloseButtonComponent = shallow(<CloseButton onClose={onClose} />)
	})

	/**
	 * Snapshot
	 */
	test('(Non-Auth) should contains proper Navigation items', () => {
		expect(toJson(CloseButtonComponent)).toMatchSnapshot()
	})

	test('should call "onClose" method from props, onClick event', () => {
		CloseButtonComponent.simulate('click')
		expect(onClose).toBeCalledTimes(1)
	})
})
