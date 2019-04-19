import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import NavButton from '../NavButton'

configure({ adapter: new Adapter() })

describe('<NavButton />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let NavButtonComponent

	beforeEach(() => {
		NavButtonComponent = shallow(
			<NavButton color={'blue'} to='MockPopup'>
				Example Text
			</NavButton>,
		)
	})

	test('should render properly, with props like color and to', () => {
		expect(toJson(NavButtonComponent)).toMatchSnapshot()
	})
})
