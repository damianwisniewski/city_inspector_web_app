import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import ForgottenPassModal from '../ForgottenPassModal'

configure({ adapter: new Adapter() })

describe('<ForgottenPassModal />', () => {
	let ForgottenPassModalElement
	const resetState = jest.fn()

	beforeEach(() => {
		ForgottenPassModalElement = shallow(
			<ForgottenPassModal.WrappedComponent
				resetPassRemindRequestStatus={resetState}
				passReminderRequestStatus='initial'
			/>,
		)
	})

	test('should call resetState after mount', () => {
		expect(resetState).toBeCalled()
	})

	test('should render correctly ForgottenPassModal', () => {
		expect(toJson(ForgottenPassModalElement)).toMatchSnapshot()
	})
})
