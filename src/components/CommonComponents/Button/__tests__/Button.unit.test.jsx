import React from 'react'
import Button from '../Button'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<Button />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let ButtonComponent
	const ButtonText = 'ExampleText'

	beforeEach(() => {
		ButtonComponent = shallow(<Button>{ButtonText}</Button>)
	})

	test('should contains children passed inside', () => {
		expect(ButtonComponent.contains(ButtonText)).toBe(true)
	})

	test('should contains color className, white by default', () => {
		expect(ButtonComponent.hasClass('white')).toBe(true)
	})

	test('should contains color className, depends on passed color prop', () => {
		ButtonComponent.setProps({ color: 'blue' })
		expect(ButtonComponent.hasClass('blue')).toBe(true)
		expect(ButtonComponent.hasClass('white')).toBe(false)
	})

	test('should contains additional className if was passed in props', () => {
		ButtonComponent.setProps({ className: 'anotherClassName' })
		expect(ButtonComponent.hasClass('anotherClassName')).toBe(true)
	})

	test('should contains all additional attributes that was passed in props', () => {
		ButtonComponent.setProps({ onClick: () => {} })
		expect(ButtonComponent.props()).toHaveProperty('onClick')
		expect(ButtonComponent.props().onClick).toBeInstanceOf(Function)
	})

	test('should call function passed in "onClick" props, on action click', () => {
		const spy = jest.fn()
		ButtonComponent.setProps({ onClick: spy })

		ButtonComponent.simulate('click')
		expect(spy).toBeCalledTimes(1)
	})
})
