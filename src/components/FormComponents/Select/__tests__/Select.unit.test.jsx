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
	const id = 'mockId'
	const onSelectOption = () => {}

	beforeEach(() => {
		SelectElement = shallow(
			<Select onChange={onSelectOption} id={id}>
				<option value=''>placeholder</option>
				<option value='Value1'>Value1</option>
				<option value='Value2'>Value2</option>
				<option value='Value3'>Value3</option>
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
		SelectElement.setState({ selected: 'Value1' })
		expect(toJson(SelectElement)).toMatchSnapshot()
	})
})
