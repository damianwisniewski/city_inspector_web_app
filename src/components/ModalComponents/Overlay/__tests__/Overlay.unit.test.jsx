import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Overlay from '../Overlay'

configure({ adapter: new Adapter() })

describe('(Modal) <Overlay />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let OverlayComponent
	const dark = true
	const children = <div />
	const onOverlayClick = jest.fn()

	beforeEach(() => {
		OverlayComponent = shallow(
			<Overlay dark={dark} onOverlayClick={onOverlayClick}>
				{children}
			</Overlay>,
		)
	})

	test('should render correctly Overlay with proper classNames, for dark prop equal true', () => {
		OverlayComponent.setProps({ dark: true })
		expect(toJson(OverlayComponent)).toMatchSnapshot()
	})

	test('should render correctly Overlay with proper classNames, for dark prop equal false', () => {
		OverlayComponent.setProps({ dark: false })
		expect(toJson(OverlayComponent)).toMatchSnapshot()
	})

	test('after click, should call function passed as onOverlayClick prop', () => {
		OverlayComponent.simulate('click', {
			target: {
				id: OverlayComponent.props().id,
			},
		})

		expect(onOverlayClick).toBeCalledTimes(1)
	})
})
