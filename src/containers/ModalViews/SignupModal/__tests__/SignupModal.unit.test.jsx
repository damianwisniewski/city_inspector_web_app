import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import SignupModal from '../SignupModal'

configure({ adapter: new Adapter() })

describe('<SignupModal />', () => {
	test('should render correctly SignupModal', () => {
		const SignupModalElement = shallow(<SignupModal />)
		expect(toJson(SignupModalElement)).toMatchSnapshot()
	})
})
