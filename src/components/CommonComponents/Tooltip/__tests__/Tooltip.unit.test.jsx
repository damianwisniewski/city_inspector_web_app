import React from 'react'
import { configure, mount, ShallowWrapper } from 'enzyme'
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

	test('should mount correctly Tooltip', () => {
		StatusElement = mount(<Tooltip>{FakeMessage}</Tooltip>)
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should mount correctly Tooltip with attr hoverable', () => {
		StatusElement = mount(<Tooltip>{FakeMessage}</Tooltip>)

		StatusElement.setProps({ hoverable: true })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ hoverable: false })
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should mount correctly Tooltip with attr show', () => {
		StatusElement = mount(<Tooltip>{FakeMessage}</Tooltip>)

		StatusElement.setProps({ show: true })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ show: false })
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should mount correctly Tooltip with positionVertical=top and one any positionHorizontal', () => {
		StatusElement = mount(<Tooltip positionVertical='top'>{FakeMessage}</Tooltip>)

		StatusElement.setProps({ positionHorizontal: 'left' })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ positionHorizontal: 'center' })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ positionHorizontal: 'right' })
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should mount correctly Tooltip with positionVertical=bottom and one any positionHorizontal', () => {
		StatusElement = mount(<Tooltip positionVertical='bottom'>{FakeMessage}</Tooltip>)

		StatusElement.setProps({ positionHorizontal: 'left' })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ positionHorizontal: 'center' })
		expect(toJson(StatusElement)).toMatchSnapshot()

		StatusElement.setProps({ positionHorizontal: 'right' })
		expect(toJson(StatusElement)).toMatchSnapshot()
	})
})
