import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import PopupRoute from '../PopupRoute'

configure({ adapter: new Adapter() })

describe('<PopupRoute />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let PopupRouteComponent
	const MockComponent = () => <p>mock</p>

	test('should render correctly', () => {
		PopupRouteComponent = shallow(<PopupRoute component={MockComponent} />)

		expect(toJson(PopupRouteComponent)).toMatchSnapshot()
	})

	test('should provide darkOverlay and closeButton to Popup', () => {
		PopupRouteComponent = shallow(<PopupRoute component={MockComponent} closeButton darkOverlay />)
		expect(PopupRouteComponent.find('Popup').props()).toMatchObject({
			closeButton: true,
			darkOverlay: true,
		})
	})

	//TODO: tests related to context
})
