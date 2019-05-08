import React from 'react'
import Button from '../Button'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

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

	test('should render correctly without any props', () => {
		expect(toJson(ButtonComponent)).toMatchSnapshot()
	})

	test('should render correctly with some additionally props', () => {
		ButtonComponent.setProps({
			color: 'green',
			className: 'test-class',
			type: 'submit',
			category: 'text',
			onClick: () => {},
		})
		expect(toJson(ButtonComponent)).toMatchSnapshot()
	})

	test('should call function passed in "onClick" props, on action click', () => {
		const spy = jest.fn()
		ButtonComponent.setProps({ onClick: spy })

		ButtonComponent.simulate('click')
		expect(spy).toBeCalledTimes(1)
	})
})
