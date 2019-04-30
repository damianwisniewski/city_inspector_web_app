import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import SignupPopup from '../SignupPopup'

configure({ adapter: new Adapter() })

describe('<SignupPopup />', () => {
	let SignupPopupElement

	test('should render correctly SignupPopup', () => {
		SignupPopupElement = shallow(<SignupPopup />)
		expect(toJson(SignupPopupElement)).toMatchSnapshot()
	})
})
