import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import ForgottenPassModal from '../ForgottenPassModal'

configure({ adapter: new Adapter() })

describe('<ForgottenPassModal />', () => {
	test('should render correctly ForgottenPassModal', () => {
		const ForgottenPassModalElement = shallow(<ForgottenPassModal />)
		expect(toJson(ForgottenPassModalElement)).toMatchSnapshot()
	})
})
