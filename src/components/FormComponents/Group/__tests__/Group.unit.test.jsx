import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Group from '../Group'

configure({ adapter: new Adapter() })

describe('<Group />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let GroupElement
	const GroupContent = <input />
	const name = 'mockName'

	test('should render correctly Group', () => {
		GroupElement = shallow(<Group name={name}>{GroupContent}</Group>)
		expect(toJson(GroupElement)).toMatchSnapshot()
	})
})
