import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import SignupModal from '../SignupModal'

configure({ adapter: new Adapter() })

describe('<SignupModal />', () => {
	let SignupModalElement
	const resetState = jest.fn()

	beforeEach(() => {
		SignupModalElement = shallow(
			<SignupModal.WrappedComponent
				resetRequestRegisterStatus={resetState}
				registerRequestStatus='initial'
			/>,
		)
	})

	test('should call resetState after mount', () => {
		expect(resetState).toBeCalled()
	})

	test('should render correctly SignupModal', () => {
		expect(toJson(SignupModalElement)).toMatchSnapshot()
	})
})
