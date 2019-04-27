import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Select from '../Select'

configure({ adapter: new Adapter() })

describe('<Select />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let SelectElement
	const SelectLabel = 'mockText'
	const id = 'mockId'
	const onSelectOption = () => {}
	const options = ['mock1', 'mock2', 'mock3']

	beforeEach(() => {
		SelectElement = shallow(
			<Select onSelectOption={onSelectOption} options={options} id={id}>
				{SelectLabel}
			</Select>,
			{ lifecycleExperimental: true },
		)
	})

	test('should render correctly Select', () => {
		expect(toJson(SelectElement)).toMatchSnapshot()
	})

	test('should render correctly Select with focus state', () => {
		SelectElement.setState({ focused: true })
		expect(toJson(SelectElement)).toMatchSnapshot()
	})

	test('should render correctly Select with selected value in state', () => {
		SelectElement.setState({ selected: options[2] })
		expect(toJson(SelectElement)).toMatchSnapshot()
	})

	test('should set target.context to state selected, after click list item (option)', () => {
		SelectElement.find('[data-type="list-item"]')
			.at(1)
			.simulate('click', {
				target: {
					textContent: options[1],
				},
			})

		expect(SelectElement.state().selected).toBe(options[1])
	})

	test('should call onSelectOption function from props, after click list item (option)', () => {
		const spy = jest.fn()
		SelectElement.setProps({ onSelectOption: spy })
		SelectElement.find('[data-type="list-item"]')
			.at(1)
			.simulate('click', {
				target: {
					textContent: options[1],
				},
			})

		expect(spy).toBeCalledTimes(1)
		expect(spy).toBeCalledWith({
			target: {
				textContent: options[1],
			},
		})
	})
})
