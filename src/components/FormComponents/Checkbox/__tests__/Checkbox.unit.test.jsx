import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Checkbox from '../Checkbox'

configure({ adapter: new Adapter() })

describe('<Checkbox />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let CheckoutElement
	const CheckoutText = 'ExampleText'
	const id = 'mockId'

	test('should render correctly Checkbox', () => {
		CheckoutElement = shallow(<Checkbox id={id} label={CheckoutText} />)
		expect(toJson(CheckoutElement)).toMatchSnapshot()
	})
})
