import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Popup from '../Popup'

configure({ adapter: new Adapter() })

describe('<NavItem />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let PopupComponent
	const children = <div />

	beforeAll(() => {
		PopupComponent = shallow(<Popup>{children}</Popup>)
	})

	test('should render correctly without specyfi any props', () => {
		expect(toJson(PopupComponent)).toMatchSnapshot()
	})

	test('should pass props for overlay to Overlay component', () => {
		PopupComponent.setProps({
			darkOverlay: true,
			onOverlayClick: () => {},
		})

		expect(toJson(PopupComponent)).toMatchSnapshot()
	})

	test('should render also CloseButton for property closeButton=true', () => {
		PopupComponent.setProps({
			closeButton: true,
			onButtonClose: () => {},
		})

		expect(toJson(PopupComponent)).toMatchSnapshot()
	})
})
