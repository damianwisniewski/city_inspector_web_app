import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import LoginPopup from '../LoginPopup'

configure({ adapter: new Adapter() })

describe('<Loader />', () => {
	let LoginPopupElement

	test('should render correctly LoginPopup', () => {
		LoginPopupElement = shallow(<LoginPopup />)
		expect(toJson(LoginPopupElement)).toMatchSnapshot()
	})

	test('should render correctly LoginPopup with remember password for state forgottenPassword true', () => {
		LoginPopupElement = shallow(<LoginPopup />)
		LoginPopupElement.setState({ forgottenPassword: true })
		expect(toJson(LoginPopupElement)).toMatchSnapshot()
	})
})
