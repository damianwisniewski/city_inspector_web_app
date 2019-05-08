import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import SignupPopup from '../SignupPopup'

configure({ adapter: new Adapter() })

describe('<SignupPopup />', () => {
	let SignupPopupElement
	const resetState = jest.fn()

	beforeEach(() => {
		SignupPopupElement = shallow(
			<SignupPopup.WrappedComponent
				resetRequestRegisterStatus={resetState}
				registerRequestStatus='initial'
			/>,
		)
	})

	test('should call resetState after mount', () => {
		expect(resetState).toBeCalled()
	})

	test('should render correctly SignupPopup', () => {
		expect(toJson(SignupPopupElement)).toMatchSnapshot()
	})
})
