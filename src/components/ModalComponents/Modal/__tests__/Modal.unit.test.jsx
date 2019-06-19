import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Modal from '../Modal'

configure({ adapter: new Adapter() })

describe('<NavItem />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let ModalComponent
	const children = <div />

	beforeAll(() => {
		ModalComponent = shallow(<Modal>{children}</Modal>)
	})

	test('should render correctly without specyfi any props', () => {
		expect(toJson(ModalComponent)).toMatchSnapshot()
	})

	test('should pass props for overlay to Overlay component', () => {
		ModalComponent.setProps({
			darkOverlay: true,
			onOverlayClick: () => {},
		})

		expect(toJson(ModalComponent)).toMatchSnapshot()
	})

	test('should render also CloseButton for property closeButton=true', () => {
		ModalComponent.setProps({
			closeButton: true,
			onButtonClose: () => {},
		})

		expect(toJson(ModalComponent)).toMatchSnapshot()
	})
})
