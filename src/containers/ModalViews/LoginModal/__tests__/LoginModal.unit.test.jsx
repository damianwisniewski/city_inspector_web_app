import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import LoginModal from '../LoginModal'

configure({ adapter: new Adapter() })

describe('<LoginModal />', () => {
	let LoginModalElement
	const resetState = jest.fn()

	beforeEach(() => {
		LoginModalElement = shallow(
			<LoginModal.WrappedComponent
				resetLoginRequestStatus={resetState}
				loginRequestState='initial'
			/>,
		)
	})

	test('should call resetRequestState after mount', () => {
		expect(resetState).toBeCalled()
	})

	test('should render correctly LoginModal', () => {
		expect(toJson(LoginModalElement)).toMatchSnapshot()
	})

	test('should render correctly LoginModal with remember password for state forgottenPassword true', () => {
		LoginModalElement.setState({ forgottenPassword: true })
		expect(toJson(LoginModalElement)).toMatchSnapshot()
	})
})
