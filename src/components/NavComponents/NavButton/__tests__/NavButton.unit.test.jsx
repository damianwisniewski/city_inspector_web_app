import React from 'react'
import NavButton from '../NavButton'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<NavButton />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let NavButtonComponent
	const ButtonText = 'ExampleText'
	const ButtonAction = jest.fn()

	beforeEach(() => {
		NavButtonComponent = shallow(<NavButton action={ButtonAction}>{ButtonText}</NavButton>)
	})

	test('should contains children passed inside', () => {
		expect(NavButtonComponent.contains(ButtonText)).toBe(true)
	})

	test('should have assigned to "onClick" prop, value of action prop', () => {
		expect(NavButtonComponent.find('Button').props().onClick).toEqual(ButtonAction)
	})

	test('should contains proper structure <li><Button/></li>', () => {
		expect(NavButtonComponent.exists('li')).toBe(true)
		expect(NavButtonComponent.find('li').exists('Button')).toBe(true)
	})
})
