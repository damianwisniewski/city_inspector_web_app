import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Tooltip from '../Tooltip'

configure({ adapter: new Adapter() })

describe('<Tooltip />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let StatusElement
	const FakeMessage = 'ExampleText'

	beforeEach(() => {
		StatusElement = shallow(<Tooltip>{FakeMessage}</Tooltip>, { disableLifecycleMethods: true })
	})

	test('should render correctly Tooltip', () => {
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should render correctly Tooltip with attr hoverable', () => {
		StatusElement.setProps({ hoverable: true })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ hoverable: false })
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should render correctly Tooltip with attr show', () => {
		StatusElement.setProps({ show: true })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ show: false })
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should render correctly Tooltip with positionVertical=top and one any positionHorizontal', () => {
		StatusElement.setProps({ positionVertical: 'top' })

		StatusElement.setProps({ positionHorizontal: 'left' })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ positionHorizontal: 'center' })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ positionHorizontal: 'right' })
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should render correctly Tooltip with positionVertical=bottom and one any positionHorizontal', () => {
		StatusElement.setProps({ positionVertical: 'bottom' })

		StatusElement.setProps({ positionHorizontal: 'left' })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ positionHorizontal: 'center' })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ positionHorizontal: 'right' })
		expect(toJson(StatusElement)).toMatchSnapshot()
	})
})
