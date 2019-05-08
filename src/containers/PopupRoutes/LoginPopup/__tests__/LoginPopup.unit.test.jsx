import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import LoginPopup from '../LoginPopup'

configure({ adapter: new Adapter() })

describe('<LoginPopup />', () => {
	let LoginPopupElement
	const resetState = jest.fn()

	beforeEach(() => {
		LoginPopupElement = shallow(
			<LoginPopup.WrappedComponent
				resetLoginRequestStatus={resetState}
				loginRequestState='initial'
			/>,
		)
	})

	test('should call resetRequestState after mount', () => {
		expect(resetState).toBeCalled()
	})

	test('should render correctly LoginPopup', () => {
		expect(toJson(LoginPopupElement)).toMatchSnapshot()
	})

	test('should render correctly LoginPopup with remember password for state forgottenPassword true', () => {
		LoginPopupElement.setState({ forgottenPassword: true })
		expect(toJson(LoginPopupElement)).toMatchSnapshot()
	})
})
